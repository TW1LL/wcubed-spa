import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';

import {HttpModule} from '@angular/http';

import {MaterializeModule} from 'ng2-materialize';
import {TruncatePipe} from './pipes/truncate';

import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'angular2-markdown';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrderService} from './modules/checkout/services/order.service';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {OrderResolve} from './modules/checkout/resolves/order.resolve';
import {CurrencyPipe} from '@angular/common';
import { CheckoutStripeComponent } from './modules/checkout/components/checkout-stripe/checkout-stripe.component';
import { AdminPageComponent } from './modules/admin/components/admin-page/admin-page.component';
import {appRoutes} from './app.routes';
import {AdminResolve} from './modules/admin/services/admin.resolve';
import {AdminService} from './modules/admin/services/admin.service';
import {UserResolve} from './modules/account/resolves/user.resolve';
import { AdminHomeComponent } from './modules/admin/components/admin-home/admin-home.component';
import { AdminProductComponent } from './modules/admin/components/admin-product/admin-product.component';
import { AdminOrderComponent } from './modules/admin/components/admin-order/admin-order.component';
import { AdminCategoryComponent } from './modules/admin/components/admin-category/admin-category.component';
import { AdminPackageComponent } from './modules/admin/components/admin-package/admin-package.component';
import { AdminProductDetailsComponent } from './modules/admin/components/admin-product-details/admin-product-details.component';
import { AdminCategoryDetailsComponent } from './modules/admin/components/admin-category-details/admin-category-details.component';
import {CartModule} from './modules/cart/cart.module';
import {FrameworkModule} from './modules/framework/framework.module';
import {CheckoutModule} from './modules/checkout/checkout.module';
import {AccountModule} from './modules/account/account.module';
import {AdminModule} from './modules/admin/admin.module';



@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    FrameworkModule
  ],
  providers: [
    CurrencyPipe
  ],
  declarations: [
    AppComponent,
    TruncatePipe,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
