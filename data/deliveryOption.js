import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOption = [
  {
     id : '1',
     deliverydays: 7,
     priceCents:0
  },
  {
     id : '2',
     deliverydays: 3,
     priceCents: 499
  },
  {
     id : '3',
     deliverydays: 1,
     priceCents:999
  }
]
export function getDeliveryOption(deliveryOptionid){
   let matchingId ;
   deliveryOption.forEach(option=>{
    if(deliveryOptionid === option.id)
      matchingId = option;
   })
   return matchingId || deliveryOption[0];
}
export function  calculateDeliveryDate(deliveryoption)
{
   const today = dayjs();
   const deliveryDate = today.add(deliveryoption.deliverydays,'days');
   const dateString = deliveryDate.format('dddd, MMMM D');
   return dateString;
}