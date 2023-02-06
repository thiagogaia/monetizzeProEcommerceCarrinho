<script>
  /* let watchButton = document.getElementsByClassName('monetizzeEcommercePro')
  
  let addProduct = function() {
    let attribute = this.getAttribute("data-name");
    alert(attribute);
  }

  for (let i = 0; i < watchButton.length; i++) {
    watchButton[i].addEventListener('click', addProduct, false);
  } */

  import dataProducts from './data/products'
  import clickOutside from './lib/clickOutside'
  import { cart } from './lib/cart'
    import CartPopUp from './components/CartPopUp.svelte';
  // console.log(cart)
  function addProduct(event) {
    /* let attribute = this.getAttribute("data-name");
    alert(attribute); */
    let element = event.target
    let buttonData = event.target.dataset
    let reference = buttonData.reference

    let product = dataProducts.find(product => product.codigo == reference)
    if (!product) {
      return
    }

    cart.add(product)
    // console.log(cart);
  }
</script>
<pre>
{JSON.stringify($cart, null, 2)}
</pre>
<div use:clickOutside={addProduct}>
  <CartPopUp />
</div>

<style>
  
</style>
