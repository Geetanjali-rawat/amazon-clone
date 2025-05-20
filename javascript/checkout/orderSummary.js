import {cart,
  removeFromCart,
  calculateCartQuantity,
   updateQuantity,
   updatedeliveryOption
  } from '../../data/cart.js';
import {products,getProduct} from '../../data/products.js';
import priceFun from '.././price.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOption,getDeliveryOption,calculateDeliveryDate} from '../../data/deliveryOption.js';
import { renderPaymentSummery } from './paymentSummary.js';
import { renderCheckoutHeader } from './checkoutHeader.js';


export function makeCartItems(){

 let  cartSummeryHtml = ''
  cart.forEach(cartItem => {
  const productId = cartItem.id;

  const  matchingItem = getProduct(productId);
   const deliveryOptionid =  cartItem.deliveryOptionId; 
   const matchingId = getDeliveryOption(deliveryOptionid); 
   const dateString = calculateDeliveryDate(matchingId);

   cartSummeryHtml += `<div class="cart-item-container js-cart-container-${matchingItem.id}">
               <div class="delivery-date">
                 Delivery date: ${dateString}
               </div>
   
               <div class="cart-item-details-grid">
                 <img class="product-image"
                   src="${matchingItem.image}">
   
                 <div class="cart-item-details">
                   <div class="product-name">
                     ${matchingItem.name}
                   </div>
                   <div class="product-price">
                     $${priceFun(matchingItem.priceCents)}
                   </div>
                   <div class="product-quantity">
                     <span>
                       Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span>
                     </span>
                     <span class="update-quantity-link link-primary js-update-links" data-product-id = "${matchingItem.id}">
                       Update
                        </span>
                       <input class="quantity-input          js-input-quantity-${matchingItem.id}" data-product-id = "${matchingItem.id}">
                       <span class="save-quantity-link link-primary js-save-link" data-product-id="${matchingItem.id}">Save</span>
                     <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingItem.id}">
                       Delete
                     </span>
                   </div>
                 </div>
   
                 <div class="delivery-options">
                   <div class="delivery-options-title">
                     Choose a delivery option:
                   </div>
                     ${deliveryOptionHtml(matchingItem,cartItem)}
                  
                   </div>
                 </div>
               </div>
             </div>`
    });


    

function deliveryOptionHtml(matchingItem,cartItem) {
 let html = '';

  deliveryOption.forEach(option => {
    const dateString = calculateDeliveryDate(option)
    
    const priceString = option.priceCents === 0
      ? 'FREE '
      : `$${priceFun(option.priceCents)} - `;
      const isChecked = option.id === cartItem.deliveryOptionId;
    

    html += `
      <div class="delivery-option js-delivery-option" data-product-id = "${matchingItem.id}"
      data-delivery-option-id = "${option.id}">
        <input type = "radio" 
        ${isChecked ? 'checked' : ''} class="delivery-option-input"
         name="${matchingItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>`;
  });

  return html;
}


    document.querySelector('.js-order-summery').innerHTML = cartSummeryHtml;

    document.querySelectorAll('.js-delivery-option').forEach(deliveryOption=>{
      deliveryOption.addEventListener('click',()=>{
        let {productId,deliveryOptionId} = deliveryOption.dataset;
        updatedeliveryOption(productId , deliveryOptionId);
        makeCartItems();
         renderPaymentSummery();
      })
    })

  
    
    document.querySelectorAll('.js-delete-link').forEach(link =>{
      link.addEventListener('click',()=>{
        const {productId} = link.dataset
        removeFromCart(productId);
        // updateCartQuantity();
        renderPaymentSummery();
        renderCheckoutHeader();
      //  const container =  document.querySelector(`.js-cart-container-${productId}`)
      //   container.remove();  using Dom 
      makeCartItems(); // using MVC
      })
    })  

  //  function updateCartQuantity()
  //  {
  //      const cartQuantity = calculateCartQuantity();
  //     document.querySelector('.js-return-to-home-link').innerHTML = `${cartQuantity} items`;
  //  }

  //  updateCartQuantity ();

    document.querySelectorAll('.js-update-links').forEach(updateLink =>{
      updateLink.addEventListener('click',()=>{
       const {productId} = updateLink.dataset;
      document.querySelector(`.js-cart-container-${productId}`).classList.add('is-editing-quantity');
      })
    })

 
    document.querySelectorAll('.js-save-link').forEach(
      saveLinks =>{
        saveLinks.addEventListener('click',()=>{
          
          const {productId} = saveLinks.dataset;
          handleSaveQuantity(productId);
          // const quantityInput = document.querySelector(`.js-input-quantity-${productId}`);
          // const newQuantity = Number(quantityInput.value)
          // if(newQuantity <= 0 || newQuantity >= 100)
          //   {
          //    alert(`Quantity must be less than 100 or greater than 0`);
          //    return;
          // }
          // updateQuantity(productId,newQuantity);
          // const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
          // quantityLabel.innerHTML = newQuantity;
          //  document.querySelector(`.js-cart-container-${productId}`).classList.remove('is-editing-quantity')
          //   updateCartQuantity ();
        
        })
      }
    )


 function handleSaveQuantity(productId)
 {
  const quantityInput = document.querySelector(`.js-input-quantity-${productId}`);
   const newQuantity = Number(quantityInput.value)
    if(newQuantity > 0 && newQuantity < 100)
    {
       updateQuantity(productId,newQuantity);
       const quantityLabel = document.querySelector(`.js-quantity-label-${productId}`);
          quantityLabel.innerHTML = newQuantity;
           document.querySelector(`.js-cart-container-${productId}`).classList.remove('is-editing-quantity');
          //  updateCartQuantity ();
          renderCheckoutHeader();
        renderPaymentSummery();

    }
    else{
       alert(`Quantity must be less than 100 or greater than 0`);
            //  return;
    }
    }
 
 document.querySelectorAll('.quantity-input').forEach(input=>{
  input.addEventListener('keydown',(e)=>{
    if(e.key === 'Enter')
    {
      const {productId} = input.dataset;
      handleSaveQuantity(productId)
    }
  })
 })
}  
  


