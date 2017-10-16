import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CheckoutStripeComponent} from './components/checkout-stripe/checkout-stripe.component';
import {CheckoutCardComponent} from './components/checkout-card/checkout-card.component';
import {CartItemComponent} from '../cart/components/cart-item/cart-item.component';
import {CheckoutFinalizedComponent} from './components/checkout-finalized/checkout-finalized.component';
import {CheckoutConfirmComponent} from './components/checkout-confirm/checkout-confirm.component';
import {CheckoutShipmentComponent} from './components/checkout-shipment/checkout-shipment.component';
import {WcubedWizardComponent} from './components/wizard/wizard.component';
import {CheckoutAddressComponent} from './components/checkout-address/checkout-address.component';
import {OrderResolve} from './resolves/order.resolve';
import {OrderService} from './services/order.service';
import {MaterializeModule} from 'ng2-materialize';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CartModule} from '../cart/cart.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    RouterModule,
    CartModule
  ],
  providers: [
    CurrencyPipe,
    OrderResolve,
    OrderService
  ],
  declarations: [
    CheckoutAddressComponent,
    WcubedWizardComponent,
    CheckoutShipmentComponent,
    CheckoutConfirmComponent,
    CheckoutFinalizedComponent,
    CheckoutCardComponent,
    CheckoutStripeComponent
  ]
})
export class CheckoutModule { }
