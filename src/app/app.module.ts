import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {ProductListComponent} from './components/cart/product-list/product-list.component';
import {ProductService} from './services/product.service';
import {HttpModule} from '@angular/http';
import {ProductCardComponent} from './components/cart/product-card/product-card.component';
import {MaterializeModule} from 'ng2-materialize';
import {TruncatePipe} from './pipes/truncate';
import { AccountDropdownComponent } from './components/account/account-dropdown/account-dropdown.component';
import { NavCartComponent } from './components/cart/nav-cart/nav-cart.component';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { WCubedSectionComponent } from './components/layout/wcubed-section/wcubed-section.component';
import { WcubedHomeComponent } from './components/layout/wcubed-home/wcubed-home.component';
import {CategoryListComponent} from './components/cart/category-list/category-list.component';
import { CategoryCardComponent } from './components/cart/category-card/category-card.component';
import {CategoryService} from './services/category.service';
import {CategoryListResolve} from './services/resolves/category.resolve';
import {ProductListResolve} from './services/resolves/product.resolve';
import {RouterModule, Routes} from '@angular/router';
import {MarkdownModule} from 'angular2-markdown';
import { ProductDetailsComponent } from './components/cart/product-details/product-details.component';
import {WcubedFooterComponent} from './components/layout/wcubed-footer/wcubed-footer.component';
import { WcubedAppComponent } from './components/layout/wcubed-app/wcubed-app.component';
import {LoadingService} from './services/loading.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OrderService} from './services/order.service';
import {AuthService} from './services/auth.service';
import {ProductDetailsResolve} from './services/resolves/productdetails.resolve';
import { AccountLoginComponent } from './components/account/account-login/account-login.component';
import { AccountPageComponent} from './components/account/account-page/account-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AccountRegisterComponent } from './components/account/account-register/account-register.component';
import { CheckoutAddressComponent } from './components/checkout/checkout-address/checkout-address.component';
import { WcubedWizardComponent } from './components/checkout/wizard/wizard.component';
import { CheckoutShipmentComponent } from './components/checkout/checkout-shipment/checkout-shipment.component';
import { CheckoutConfirmComponent } from './components/checkout/checkout-confirm/checkout-confirm.component';
import { CheckoutFinalizedComponent } from './components/checkout/checkout-finalized/checkout-finalized.component';
import { CartItemComponent } from './components/cart/cart-item/cart-item.component';
import { CheckoutCardComponent } from './components/checkout/checkout-card/checkout-card.component';
import {OrderResolve} from './services/resolves/order.resolve';
import {CurrencyPipe} from '@angular/common';
import { CheckoutStripeComponent } from './components/checkout/checkout-stripe/checkout-stripe.component';
import { AdminPageComponent } from './components/admin/admin-page/admin-page.component';
import {appRoutes} from './app.routes';
import {AdminResolve} from './services/resolves/admin.resolve';
import {AdminService} from './services/admin.service';
import {UserResolve} from './services/resolves/user.resolve';



@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpModule,
    MaterializeModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    MarkdownModule.forRoot(),
  ],
  providers: [
    ProductService,
    CategoryService,
    LoadingService,
    AdminService,
    CategoryListResolve,
    ProductListResolve,
    ProductDetailsResolve,
    AdminResolve,
    OrderResolve,
    UserResolve,
    OrderService,
    AuthService,
    AccountLoginComponent,
    CurrencyPipe
  ],
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCardComponent,
    TruncatePipe,
    AccountDropdownComponent,
    NavCartComponent,
    NavbarComponent,

    WCubedSectionComponent,
    WcubedFooterComponent,
    WcubedHomeComponent,

    CategoryListComponent,
    CategoryCardComponent,
    ProductDetailsComponent,
    WcubedAppComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
    CheckoutAddressComponent,
    WcubedWizardComponent,
    CheckoutShipmentComponent,
    CheckoutConfirmComponent,
    CheckoutFinalizedComponent,
    CartItemComponent,
    CheckoutCardComponent,
    CheckoutStripeComponent,
    AdminPageComponent,
    AccountPageComponent
  ],
  entryComponents: [
    AccountLoginComponent,
    AccountRegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
