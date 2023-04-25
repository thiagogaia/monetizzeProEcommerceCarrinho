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
  const X_CONSUMER_KEY = "DegJLU5M3uSQAhGTP7cbRH3twbj8COrD"
  const apiUrl = "http://api.local/2.1"
  const txtCheckout = "KHF1421"

  let bodyRequest = {
    checkout: txtCheckout,
    tempo_expiracao: 20000,
    valor_soma_produtos: 0,
    valor_desconto: 0,
    valor_acrescimo: 0,
    valor_total: 0,
    bloquear_dados_comprador: false,
    dados_comprador: {},
    produtos: []
  }

  // import { onMount } from 'svelte'
  import dataProducts from './data/products'
  import clickOutside from './lib/clickOutside'
  import { cart } from './lib/cart'
  import { cartIcon, closeIcon, arrowRightIcon, minusCircleIcon ,plusCircleIcon } from './data/icons'
  /* import axios from 'axios'
  const api = axios.create({
    baseURL: 'https://api.monetizze.com.br'
  }) */

  function addProduct(event, activeElement) {
    // console.log(activeElement.dataset)
    let element = activeElement
    let buttonData = element.dataset
    let reference = buttonData.reference

    let product = dataProducts.find(product => product.codigo == reference)
    if (!product) {
      return
    }

    cart.add(product)
    showSlide = true
  }

  
  let showSlide = false
  function appearSlide() {
    console.log('appearSlide')
		showSlide = true;
	}

  function disappearSlide() {
    console.log('disappearSlide')
		showSlide = false;
	}

  async function getAccessToken() {
    try {
      let myHeaders = new Headers()
      myHeaders.append("X_CONSUMER_KEY", X_CONSUMER_KEY)
      let requestOptions = {
        method: 'GET',
        headers: myHeaders
      }

      const response = await fetch(apiUrl + '/token', requestOptions)
      const resp = await response.json()
      localStorage.setItem("ecommerce_token", JSON.stringify(resp));
      // console.log(resp, 'resp')
      return resp
    } catch (error) {
      // console.log(error, 'erro');
      return {}
    }
    
  }

  async function getCart(token) {
    try {
      var myHeaders = new Headers();
      myHeaders.append("TOKEN", token);
      
      var raw = JSON.stringify(bodyRequest)

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw
      };

      const response = await fetch(apiUrl + "/ecommerce/checkout", requestOptions)
      const resp = await response.json()

      return resp
    } catch (error) {
      return {}
    }
  }

  let isFetching = false
  async function goFinishOrder() {
    isFetching = true
    console.log('finish order')
    //pegar o token
    let accessToken = await getAccessToken()
    let token = accessToken.token
    if (!token) {
      alert('Não foi possível comunicar com o servidor')
      isFetching = false
      return
    }

    let cartItems = $cart.items
    let products = []
    cartItems.forEach(el => {
      let product = el.product
      product.quantidade = el.quantity
      products.push(product)
    });

    bodyRequest.produtos = products
    bodyRequest.valor_soma_produtos = $cart.totalPrice
    bodyRequest.valor_total = $cart.totalPrice

    bodyRequest.valor_soma_produtos.toFixed(2)
    bodyRequest.valor_total.toFixed(2)

    let respCart = await getCart(token)
    if (respCart.Error) {
      alert(respCart.Error)
      isFetching = false
      return
    }
    console.log(respCart, 'respCart');
    if (!respCart.url_checkout) {
      alert('Houve um erro ao efetuar o pedido. Tente novamente em instantes.')
      isFetching = false
      return
    }

    window.localStorage.removeItem('cart')
    window.location.href = respCart.url_checkout
    //enviar os parâmettros
    //redirecionar para a url recebida
  }

  function formatCurrency(number) {
		return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(number)
	}

  /* let allMounted = false
  onMount(() => {
    allMounted = true
  }) */
</script>
<!-- <pre style="width: 100%; overflow: hidden;">
  {JSON.stringify($cart, null, 2)}
</pre> -->
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
          {#each $cart.items as item}
          <div class="slider-content-cart-items">
            <div class="cart-items-image">
              <img src="{item.product.img}" alt="{item.product.nome}" width="88.8" height="109">
            </div>
            <div class="cart-items-data">
              <span class="items-product-name">{item.product.nome}</span>
              <div class="items-quantity-price">
                <span class="items-product-quantity">{item.quantity}x</span>
                <span class="items-product-divider"></span>
                <span class="items-product-price">{formatCurrency(item.totalPrice)}</span>
              </div>
              
              <div class="buttonHorizontal">
                <button class="counter-button" on:click={() => cart.del(item.product)}>
                  {@html minusCircleIcon}
                </button>
                <span class="counter-value">{item.quantity}</span>
                <button class="counter-button" 
                  on:click={() => cart.add(item.product)}
                  >
                  {@html plusCircleIcon}
                </button>
              </div>
            </div>
          </div>
          {/each}
        {/if}
      </div>
      
      <div class="slider-footer-checkout" 
        on:click={goFinishOrder} 
        on:keyup={goFinishOrder}
        class:pointer-events-none={$cart.totalItems == 0 || isFetching}>
        <div class="" style="display: flex; text-align: -webkit-center;">
          <span class="qty-cart">
            <span class="qty-cart-text">{$cart.totalItems}</span>
          </span>
          <span class="link-checkout">Pague agora</span>
        </div>
        <div class="">
          <span class="arrow-right">{@html arrowRightIcon}</span>
        </div>
      </div>
      
      <div 
        on:click={disappearSlide} 
        on:keyup={disappearSlide} 
        style="color: rgb(73, 74, 87); margin: 10px auto; padding: 10px; font-size: 1.1rem; font-weight: bold; cursor: pointer;">        
        Continuar Comprando
      </div>
     
      
    </div>
  </div>
  <!-- .Slide Component -->

</div>

<style>
  /* .allContent {
    display: none;
  } */
  /* @import url('https://fonts.cdnfonts.com/css/montserrat'); */
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

  .slider-content-cart-items {
    display: flex;
    justify-content: flex-start;
    margin-left: 29px;
    margin-right: 29px;
    padding-top: 30px;
    padding-bottom: 30px;
    border-bottom: 1px solid #D5DDE4;
  }

  .cart-items-image {
    box-sizing: border-box;
    width: 111px;
    height: 111px;
    border: 1px solid #D5DDE4;
    border-radius: 6px;
    padding: 0 11px;
  }

  .slider-content-cart-items:last-child {
    border-bottom: 0px;
  }

  .cart-items-data {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
  }

  .items-product-name {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */
    color: #0E1837;
  }

  .items-quantity-price {
    margin-top: 15px;
  }

  .items-product-quantity {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #0E1837;
    
  }

  .items-product-divider {
    border: 1px solid #D5DDE4;
    transform: rotate(90deg);
    margin-left: 15px;
    margin-right: 15px;
  }

  .items-product-price {
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: #0E1837;
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

  /* css counter */
  .buttonHorizontal {
    display: flex;
    font-size: 0.9em;
    font-weight: 600;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    flex-shrink: 0;
    width: 118px;
    height: 46px;
    background: #F5F7F9;
    color: rgb(13, 17, 54);
    border-radius: 30px;
    overflow: hidden;
    margin-top: 16px;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
  }

  .counter-value {
		pointer-events: none;
	}

  button {
		-webkit-appearance: button;
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    text-align: center;
    font: 400 13.3333px Arial;
	}

  .counter-button {
		background-color: transparent;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    height: 100%;
    cursor: pointer;
    color: rgb(73, 74, 87);
    border-width: initial;
    border-style: none;
    border-color: initial;
    border-image: initial;
    width: 42px;
	}
  /* .css counter */
</style>
