import {testEnvironment} from '../../environments/environment'
import {prodEnvironment} from '../../environments/environment.prod.ts'
import { isDevMode } from '@angular/core';

if ( isDevMode() ) {
  environment = testEnvironment
}
else {
  environment = prodEnvironment
}

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
  purchase: environment.host + '/payment/purchase'
};
