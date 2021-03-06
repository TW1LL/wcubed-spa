import {environment} from '../../environments/environment';


export const API = {
  product: environment.host + '/product',
  order: environment.host + '/order',
  orderCreate: environment.host + '/order/create',
  category: environment.host + '/category',
  user: environment.host + '/user',
  userLogin: environment.host + '/user/login',
  userRegister: environment.host + '/user/register',
  shipmentCreate: environment.host + '/shipment/create',
  shipmentBuy: environment.host + '/shipment/buy',
  purchase: environment.host + '/payment/purchase',
  checkRank: environment.host + '/user/check-rank',
  packaging: environment.host + '/package',
  upload: environment.host + '/upload',
  finalize: environment.host + '/order/finalize'
};

export const OrderStatus = {
  'created': 'Cart created. Awaiting checkout and address.',
  'address': 'Address saved. Selecting Shipment Method.',
  'shipment': 'Created Shipment. Confirming and getting card info.',
  'confirm': 'Card information valid and saved. Saving order.',
  'shipping' : 'Order saved. Creating shipping label and tracking number.',
  'paying' : 'Tracking number created. Charging card.',
  'finalizing': 'Finalizing Order...',
  'finalized': 'Order confirmed. Confirmation number generated.'
};

export const OrderColor = {
  'created': 'blue-grey lighten-3',
  'address': 'blue-grey lighten-2',
  'shipment': 'blue-grey lighten-1',
  'confirm': 'white',
  'shipping' : 'grey',
  'paying' : 'yellow',
  'finalizing': 'yellow lighten-1',
  'finalized': 'green'
};
