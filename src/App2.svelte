<script>
  import dataProducts from './data/products'
  import clickOutside from './lib/clickOutside'
  import { cart } from './lib/cart'

	function addProduct(event) {
    let element = event.target
    let buttonData = event.target.dataset
    let reference = buttonData.reference

    let product = dataProducts.find(product => product.codigo == reference)
    if (!product) {
      return
    }

    cart.add(product)
  }

  let cartIcon = `<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M23.7188 23.7188H8.99766L5.40117 3.94453C5.35909 3.70772 5.23556 3.49307 5.05196 3.33771C4.86835 3.18235 4.63621 3.09605 4.3957 3.09375H2.0625" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.3125 28.875C11.7364 28.875 12.8906 27.7207 12.8906 26.2969C12.8906 24.873 11.7364 23.7188 10.3125 23.7188C8.88864 23.7188 7.73438 24.873 7.73438 26.2969C7.73438 27.7207 8.88864 28.875 10.3125 28.875Z" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M23.7188 28.875C25.1426 28.875 26.2969 27.7207 26.2969 26.2969C26.2969 24.873 25.1426 23.7188 23.7188 23.7188C22.2949 23.7188 21.1406 24.873 21.1406 26.2969C21.1406 27.7207 22.2949 28.875 23.7188 28.875Z" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8.05664 18.5625H24.2473C24.7293 18.564 25.1965 18.3955 25.5666 18.0866C25.9368 17.7778 26.1862 17.3484 26.2711 16.8738L27.8438 8.25H6.1875" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`
	let closeIcon = `<svg width="33" height="33" viewBox="0 0 33 33" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M25.7812 7.21875L7.21875 25.7812" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M25.7812 25.7812L7.21875 7.21875" stroke="#6A82BA" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `

  let arrowRightIcon = `<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.4375 11H18.5625" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M12.375 4.8125L18.5625 11L12.375 17.1875" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    `
	
	let showSlide = false
  function appearSlide() {
    console.log('appearSlide')
		showSlide = true;
	}

  function disappearSlide() {
    console.log('disappearSlide')
		showSlide = false;
	}

  function goFinishOrder() {
    console.log('finish order')
  }
</script>
<div use:clickOutside={addProduct}>
	<pre>
	{JSON.stringify($cart, null, 2)}
	</pre>
	<button class="cart-popup popup-desktop">
		<div class="cart-popup-itens border-bottom">
			<span>{@html cartIcon}</span>
			<span class="cart-popup-text">Carrinho</span>
		</div>
		<div class="cart-popup-itens">
			<span class="cart-popup-qty cart-popup-desktop-qty">{$cart.totalItems}</span>
			<span class="cart-popup-text-small">Meus ítens</span>
		</div>
	</button>

	<button class="cart-popup cart-popup-mobile" >
		<span class="cart-popup-mobile-itens">
			<span>
				{@html cartIcon}
			</span>
			<span class="cart-popup-qty cart-popup-mobile-qty">{$cart.totalItems}</span>
		</span>
	</button>
</div>

<style>
  .border-bottom {
		border-bottom: 1px solid #D5DDE4;
	}

  .cart-popup {
		height: auto;
    width: auto;
    display: flex;
    flex-direction: column;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25);
    cursor: pointer;
    position: fixed;
    right: 0px;
    top: 50%;
    margin-top: -46px;
    z-index: 99;
    padding: 0px;
    border-radius: 30px 0px 0px 30px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    outline: 0px;
	}

  .cart-popup-itens {
		font-family: Lato, sans-serif;
    font-size: 13px;
    font-weight: 700;
    color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    padding: 15px 20px;
	}

  .cart-popup-qty {
		color: #fff;
		width: 1.25rem;
		height: 1.25rem;
		border-radius: 50%;
		background-color: #6C5DD3;
		font-size: .75rem;
		font-weight: 500;
		text-align: center;
		line-height: 1.25rem;
	}

	.cart-popup-desktop-qty {
		margin-left: 4px;
	}

	.cart-popup-text {
		/* margin-left: 5px; */
		color: #0E1837;
		font-family: "Rubik",sans-serif;
		font-style: normal;
		font-weight: 500;
		font-size: 20px;
		line-height: 24px;
	}

	.cart-popup-text-small {
		color: #000000;
		font-family: "Rubik",sans-serif;
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 20px;
		text-decoration-line: underline;
		margin-left: 7px;
	}

  .cart-popup-mobile {
		display: none;
	}

  @media (max-width: 580px) {
		.cart-popup {
			display: none;
		}
		
		.cart-popup-mobile {
			width: 63px;
	    height: auto;
	    display: flex;
			flex-direction: column;
      -webkit-box-align: center;
      align-items: center;
			-webkit-box-pack: center;
			justify-content: center;
      background-color: #FFFFFF;
      box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.25);
			border-radius: 30px 0px 0px 30px;
      cursor: pointer;
      position: fixed;
			right: 0px;
    	top: 50%;
			z-index: 99;
			padding: 0px;
      border-width: 0px;
      border-style: initial;
      border-color: initial;
      border-image: initial;
      outline: 0px;
		}

		.cart-popup-mobile-itens {
			font-family: Lato, sans-serif;
			font-size: 13px;
			font-weight: 700;
			color: rgb(7, 7, 227);
			display: flex;
			-webkit-box-align: center;
			align-items: center;
			-webkit-box-pack: center;
			justify-content: center;
			padding: 15px 10px;
		}

		.cart-popup-mobile-qty {
			position: absolute;
			top: .3125rem;
			right: 0.3125rem;
		}
	}
</style>