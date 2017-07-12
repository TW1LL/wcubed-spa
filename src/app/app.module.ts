import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductService} from './services/product.service';
import {HttpModule} from '@angular/http';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {MaterializeModule} from 'ng2-materialize';
import {TruncatePipe} from './pipes/truncate';
import { AccountDropdownComponent } from './components/account-dropdown/account-dropdown.component';
import { NavCartComponent } from './components/nav-cart/nav-cart.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavFooterComponent } from './components/nav-footer/nav-footer.component';
import { NavSectionComponent } from './components/nav-section/nav-section.component';
import { WcubedHomeComponent } from './components/wcubed-home/wcubed-home.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import { CategoryCardComponent } from './components/category-card/category-card.component';
import {CategoryService} from './services/category.service';
import {CategoryListResolve} from './services/category.resolve';
import {ProductListResolve} from './services/product.resolve';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: 'product', component: CategoryListComponent, resolve: {categories: CategoryListResolve}},
  { path: 'product/:category', component: ProductListComponent, resolve: {products: ProductListResolve}},
  { path: 'home', component: WcubedHomeComponent, resolve: {products: ProductListResolve}},
  { path: '', redirectTo: '/home', pathMatch: 'full'}
];


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCardComponent,
    TruncatePipe,
    AccountDropdownComponent,
    NavCartComponent,
    NavbarComponent,
    NavFooterComponent,
    NavSectionComponent,
    WcubedHomeComponent,
    CategoryListComponent,
    CategoryCardComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MaterializeModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing:true})
  ],
  providers: [
    ProductService,
    CategoryService,
    CategoryListResolve,
    ProductListResolve,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
