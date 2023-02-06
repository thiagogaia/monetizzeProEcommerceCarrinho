<script>
  import { cart } from "../lib/cart"

  let prodsCart = [];
  cart.subscribe(data => {
    prodsCart = data
  })

  let cartIcon = `<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.7188 23.7188H8.99766L5.40117 3.94453C5.35909 3.70772 5.23556 3.49307 5.05196 3.33771C4.86835 3.18235 4.63621 3.09605 4.3957 3.09375H2.0625" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.3125 28.875C11.7364 28.875 12.8906 27.7207 12.8906 26.2969C12.8906 24.873 11.7364 23.7188 10.3125 23.7188C8.88864 23.7188 7.73438 24.873 7.73438 26.2969C7.73438 27.7207 8.88864 28.875 10.3125 28.875Z" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.7188 28.875C25.1426 28.875 26.2969 27.7207 26.2969 26.2969C26.2969 24.873 25.1426 23.7188 23.7188 23.7188C22.2949 23.7188 21.1406 24.873 21.1406 26.2969C21.1406 27.7207 22.2949 28.875 23.7188 28.875Z" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.05664 18.5625H24.2473C24.7293 18.564 25.1965 18.3955 25.5666 18.0866C25.9368 17.7778 26.1862 17.3484 26.2711 16.8738L27.8438 8.25H6.1875" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
</script>

<div class="popup-desktop">
  <div class="cart-up">
    <span>{@html cartIcon}</span>
    <span>Carrinho</span>
  </div>
  <div class="cart-down">
    <span>{$cart.totalItems}</span>
    <span>Meus ítens</span>
  </div>
</div>