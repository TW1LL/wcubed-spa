export const host = 'http://localhost:3000';
export const API = {
  product: host + '/product',
  order: host + '/order',
  orderCreate: host + '/order/create',
  category: host + '/category',
  user: host + '/user',
  userLogin: host + '/user/login',
  userRegister: host + '/user/register',
  shipmentCreate: host + '/shipment/create',
  shipmentBuy: host + '/shipment/buy',
  purchase: host + '/payment/purchase'
};

export const OrderStatus = {
  'created': 'Cart created. Awaiting checkout and address.',
  'address': 'Address saved. Selecting Shipment Method.',
  'shipment': 'Created Shipment. Confirming and getting card info.',
  'confirm': 'Card information valid and saved. Saving order.',
  'shipping' : 'Order saved. Creating shipping label and tracking number.',
  'paying' : 'Tracking number created. Charging card.',
  'finalized': 'Order confirmed. Confirmation number generated.'
};

export const OrderColor = {
  'created': 'blue-grey lighten-3',
  'address': 'blue-grey lighten-2',
  'shipment': 'blue-grey lighten-1',
  'confirm': 'white',
  'shipping' : 'grey',
  'paying' : 'yellow',
  'finalized': 'green'
};
