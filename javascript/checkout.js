import{makeCartItems} from '../javascript/checkout/orderSummary.js';
import {renderPaymentSummery} from '../javascript/checkout/paymentSummary.js';
import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
// import '../data/cartClass.js';
renderCheckoutHeader();
makeCartItems();
renderPaymentSummery();