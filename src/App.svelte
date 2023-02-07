<svelte:options tag="monetizzeecommerce-pro" />
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
    // import CartPopUp from './components/CartPopUp.svelte';
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
<pre style="width: 100%; overflow: auto;">
{JSON.stringify($cart, null, 2)}
</pre>
<div use:clickOutside={addProduct}>

  <div on:click={appearSlide}
    on:keypress={appearSlide}
    >
    <!-- Popup Desktop -->
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
    <!-- .Popup Desktop -->

    <!-- Popup Mobile -->
    <button class="cart-popup cart-popup-mobile" >
      <span class="cart-popup-mobile-itens">
        <span>
          {@html cartIcon}
        </span>
        <span class="cart-popup-qty cart-popup-mobile-qty">{$cart.totalItems}</span>
      </span>
    </button>
    <!-- .Popup Mobile -->
  </div>
  
  <!-- Slide Component -->
  <div class="slider-content-container" class:showSlide="{showSlide}" class:hideSlide="{!showSlide}">
    <div class="slider-body">
      <div class="slider-header">
        <div class="slider-header-item">
          {@html cartIcon}
          <span class="slider-herader-text">Carrinho</span>
        </div>

        <button class="slider-header-item-button" on:click={disappearSlide}>
          {@html closeIcon}
        </button>
      </div>

      <div class="slider-content">
        {#if $cart.totalItems == 0}
          <div class="cart-items-empty">
            Comece a adicionar ítens no carrinho.
          </div>
        {:else}
          <div class="slider-content-cart-items">
            <div class="cart-items-image">
              imagem
            </div>
            <div class="cart-items-data">
              Nome | Qty | Preço | Add
            </div>
          </div>
        {/if}
      </div>
      
      <div class="slider-footer-checkout" 
        on:click={goFinishOrder} 
        on:keyup={goFinishOrder}
        class:pointer-events-none={$cart.totalItems == 0}>
        <div class="" style="display: flex; text-align: -webkit-center;">
          <span class="qty-cart">
            <span class="qty-cart-text">{$cart.totalItems}</span>
          </span>
          <span class="link-checkout">Comprar agora</span>
        </div>
        <div class="">
          <span class="arrow-right">{@html arrowRightIcon}</span>
        </div>
      </div>
      
    </div>
  </div>
  <!-- .Slide Component -->

</div>

<style>
  @import url('https://fonts.cdnfonts.com/css/montserrat');
  /* css popup */
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
  /* .css popup */

  /* css Slide */
  .pointer-events-none {
    pointer-events:none;
    background-color: rgb(94 123 118) !important;
  }

  .showSlide {
		right: 0px;
	}

	.hideSlide {
		right: -450px;
	}

	.slider-content-container {
		width: 430px;
    height: 100vh;
    min-height: 100vh;
    /* mobile viewport bug fix */
    min-height: -webkit-fill-available;
    background-color: rgb(255, 255, 255);
    position: fixed;
    bottom: 0px;
    z-index: 1010;
    box-shadow: 0px 4px 32px rgb(0 0 0 / 25%);
    border-radius: 30px 0px 0px 30px;
    transition: all 0.35s ease-in-out 0s;
    z-index: 999;
    top: 0px;
	}

	.slider-body {
		height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    background-color: rgb(255, 255, 255);
    box-sizing: content-box;
    border-radius: 30px 0px 0px 30px;
	}

	.slider-header {
		background-color: rgb(255, 255, 255);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 15px 25px;
    border-bottom: 1px solid rgb(241, 241, 241);
    font-family: Lato, sans-serif;
    margin: 0px;
    border-radius: 30px 0px 0px 0px;
	}

	.slider-header-item {
		display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    color: rgb(0, 158, 127);
	}

  .slider-herader-text {
    font-family: 'Montserrat', sans-serif;
    font-style: normal;
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: #0E1837;
    margin-left: 10px;
  }

	.slider-header-item-button {
		width: 33px;
    height: 33px;
    display: inline-flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.25);
    background-color: transparent;
    padding: 0px;
    border-width: 0px;
    border-style: initial;
    border-color: initial;
    border-image: initial;
    outline: 0px;
    transition: all 0.4s ease 0s;
	}

	.slider-header-item-button:hover {
		color: rgb(234, 77, 74);
	}

	.slider-content {
		height: 100%;
		max-height: calc(100vh - 151px);
		overflow-y: auto;
		position: relative;
		flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-content: flex-start;
    -webkit-box-align: start;
    align-items: flex-start;
	}

  .cart-items-empty {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
    /* identical to box height */
    text-align: center;
    color: #000000;
    margin-top: 50%;
  }

  .qty-cart {
    width: 51px;
    height: 51px;
    background: #FFFFFF;
    border: 2px solid #6C5DD3;
    box-sizing: border-box;
    border-radius: 50%;
    text-align: center;
  }

  .qty-cart-text {
    position: relative;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    color: #6C5DD3;
    top: 13px;
    
  }

	.slider-footer-checkout {
		display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    background: #6C5DD3;
    border-radius: 30px;
    cursor: pointer;
    height: 51px;
    margin-left: 29px;
    margin-right: 31px;
	}

	.link-checkout {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 20px;
    font-weight: 700;
    color: #FFFFFF;
    margin-top: 15px;
    margin-left: 15px;
	}

	.arrow-right {
    margin-right: 30px;
  }

	@media (max-width: 580px) {
		.hideSlide {
			right: -690px;
		}

		.slider-content-container {
			width: 100%;
      border-radius: 0;
		}

    .slider-body {
      border-radius: 0;
    }

    .slider-header {
      border-radius: 0;
    }
	}
  /* .css Slide */
</style>
