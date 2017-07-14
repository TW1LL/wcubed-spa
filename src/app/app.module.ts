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

const appRoutes: Routes = [
  { path: 'product', component: CategoryListComponent, resolve: {categories: CategoryListResolve}},
  { path: 'product/:category', component: ProductListComponent, resolve: {products: ProductListResolve}},
  { path: 'home', component: WcubedHomeComponent, resolve: {products: ProductListResolve}},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  imports: [
    BrowserModule,
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
    CategoryListResolve,
    ProductListResolve,
    OrderService,
    AuthService,
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
    WcubedAppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
