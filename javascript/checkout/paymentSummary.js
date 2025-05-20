 import {cart} from '../../data/cart.js';
 import { getProduct } from '../../data/products.js';
 import { getDeliveryOption } from '../../data/deliveryOption.js';
 import priceFun  from '../price.js';
 export function renderPaymentSummery(){
     let productPricecents = 0;
     let totalCartItems = 0;
     let shippingPriceCents = 0;
          cart.forEach(cartItem => {
            const product =  getProduct(cartItem.id);
            productPricecents += product.priceCents * cartItem.quantity;
            totalCartItems += cartItem.quantity
           const deliveryoption = getDeliveryOption(cartItem.deliveryOptionId);
           shippingPriceCents += deliveryoption.priceCents
    
          });
     const totalBeforeTaxcents = productPricecents + shippingPriceCents;
     const taxCents = totalBeforeTaxcents *0.1;
     const totalCents = totalBeforeTaxcents + taxCents;


  const paymentSummaryHtml = 
  `
   <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${totalCartItems}):</div>
            <div class="payment-summary-money">$${priceFun(productPricecents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${priceFun( shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${priceFun(totalBeforeTaxcents)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${priceFun(taxCents)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${priceFun(totalCents)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
  
  
  `;
  document.querySelector('.js-payment-summery').innerHTML = 
   paymentSummaryHtml;
}