class Cart
{
           cartItems;
          cartStorage;



          constructor(localStorageKey){
            this.cartStorage = localStorageKey;
            this.loadFromStorage();
          }

   loadFromStorage() 
 {
   this.cartItems = JSON.parse(localStorage.getItem(this.cartStorage));
          if(!this.cartItems){
             this.cartItems = [
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
   }


   saveToStorage()
    {
    localStorage.setItem(this.cartStorage,JSON.stringify(this.this.cartItems));
    }


     addtoCart(productId,quantitySelected){
      let matchingItem;
      this.cartItems.forEach((value)=>{
      if( productId === value.id){
          matchingItem = value;
      }
      })
   if(matchingItem){
    matchingItem.quantity += quantitySelected;
   }
   else{
    this.cartItems.push({
      id:productId,
      quantity: quantitySelected,
      deliveryOptionId : '1'
    })
   }
   this.saveToStorage();
  }


   removeFromCart(productId)
          {
                 const newCart = this.cartItems.filter(cartItem=>{
                 return (cartItem.id !== productId)
               })
               this.cartItems = newCart;
              this.saveToStorage();
           }

    calculateCartQuantity(){
  let cartQuantity = 0;
       this.cartItems.forEach(cart=>{
        cartQuantity += cart.quantity;
    })
    return cartQuantity;
    }
  

    updateQuantity(productId,newQuantity)
  {
    let matchingItem;
    this.cartItems.forEach(cartItem=>{
      if(productId === cartItem.id){
        matchingItem = cartItem
      }
    })
     matchingItem.quantity = newQuantity;
        this.saveToStorage();
  }

   updatedeliveryOption(productId,delievryOption)
 {
  let matchingItem;
  this.cartItems.forEach(cartItem=>{
    if(cartItem.id === productId)
    matchingItem = cartItem
  })
  matchingItem.deliveryOptionId = delievryOption;
  this.saveToStorage();
 }
  
}



 const cart = new Cart('cart-oop');
 console.log(cart);
const businessCart = new Cart('cart-business');
const cartF = new Cart('cart-f');
cart.cartStorage = 'text'
console.log(cart);


 
 console.log(cartF);

console.log(businessCart);

 
  



 
   
 
 
 