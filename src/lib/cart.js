import { writable, get, derived } from 'svelte/store';
import _ from 'lodash'
function createCart() {
  let cartIni = {
    items: [],
    totalPrice: 0,
    totalItems: 0
  }
  let prodsCart = JSON.parse(window.localStorage.getItem('cart')) || cartIni
  let cartStore = writable(prodsCart)
  let computedStore = derived(cartStore, updatedCartStore => {
    updatedCartStore.items = updatedCartStore.items.filter(item => item.quantity > 0)
    updatedCartStore.items.forEach(item => {
      item.totalPrice = item.product.preco * item.quantity
    })
    updatedCartStore.totalPrice = updatedCartStore.items.reduce((a, b) => a + b.totalPrice, 0)
    updatedCartStore.totalItems = updatedCartStore.items.reduce((a, b) => a + b.quantity, 0)
    window.localStorage.setItem('cart', JSON.stringify(updatedCartStore))
    return updatedCartStore
  })
  return {
    subscribe: computedStore.subscribe,
    set: cartStore.set,
    qty: 1,
    add: function (product) {
      if (this.findItem(get(cartStore), product)) {
        cartStore.update(currentCart => {
          let currentItem = this.findItem(currentCart, product)
          currentItem.quantity = currentItem.quantity + this.qty
          return currentCart
        })
      }
      else {
        cartStore.update(cartStore => {
          cartStore.items.push({
            product: product,
            totalPrice: product.preco,
            quantity: 1
          })
          return cartStore
        })
      }
    },
    del: function (prod) {
      this.qty = -1
      this.add(prod)
      this.qty = 1
    },
    remove: function (prod) {
      let cartItem = this.findItem(get(cartStore), prod)
      this.qty = (-1) * cartItem.quantity - 1
      this.add(prod)
      this.qty = 1
    },
    findItem: function (currentCart, product) {
      return currentCart.items.find(item => _.isEqual(item.product, product))
    },
    checkout: function () {
      return get(computedStore)
    }
  }
}

export let cart = createCart()