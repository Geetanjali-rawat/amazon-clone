export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
 cart = [
    {
    id:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryOptionId : '1'
    },
    {
      id:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity:1,
       deliveryOptionId : '2'
    },
    
  ]
}
  function saveToStorage(){
    localStorage.setItem('cart',JSON.stringify(cart));
  }
    export function addtoCart(productId,quantitySelected){
      let matchingItem;
      cart.forEach((value)=>{
      if( productId === value.id){
          matchingItem = value;
      }
      })
   if(matchingItem){
    matchingItem.quantity += quantitySelected;
   }
   else{
    cart.push({
      id:productId,
      quantity: quantitySelected,
      deliveryOptionId : '1'
    })
   }
   saveToStorage();
}

export function removeFromCart(productId)
{
// const newCart = [];

// cart.forEach(cartItem=>{
//   if(cartItem.id !== productId)
//   {
//     newCart.push(cartItem);
//   }
// })
// cart = newCart; 
 const newCart = cart.filter(cartItem=>{
  return (cartItem.id !== productId)
})
cart = newCart;
saveToStorage();
}

 export function calculateCartQuantity(){
  let cartQuantity = 0;
       cart.forEach(cart=>{
        cartQuantity += cart.quantity;
    })
    return cartQuantity;
    }
   
 export  function updateQuantity(productId,newQuantity)
  {
    let matchingItem;
    cart.forEach(cartItem=>{
      if(productId === cartItem.id){
        matchingItem = cartItem
      }
    })
     matchingItem.quantity = newQuantity;
        saveToStorage();
  }
 export function updatedeliveryOption(productId,delievryOption)
 {
  let matchingItem;
  cart.forEach(cartItem=>{
    if(cartItem.id === productId)
    matchingItem = cartItem
  })
  matchingItem.deliveryOptionId = delievryOption;
  saveToStorage();
 }