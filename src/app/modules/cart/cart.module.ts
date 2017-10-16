import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {CategoryService} from './services/category.service';
import {ProductService} from './services/product.service';
import {CategoryListResolve} from './resolves/category.resolve';
import {ProductListResolve} from './resolves/product.resolve';
import {ProductDetailsResolve} from './resolves/productdetails.resolve';
import {ProductListComponent} from './components/product-list/product-list.component';
import {ProductCardComponent} from './components/product-card/product-card.component';
import {CategoryListComponent} from './components/category-list/category-list.component';
import {CategoryCardComponent} from './components/category-card/category-card.component';
import {ProductDetailsComponent} from './components/product-details/product-details.component';
import {MarkdownModule} from 'angular2-markdown';
import {MaterializeModule} from 'ng2-materialize';
import {RouterModule} from '@angular/router';
import {CartItemComponent} from './components/cart-item/cart-item.component';
import {NavCartComponent} from './components/nav-cart/nav-cart.component';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    MaterializeModule.forRoot(),
    RouterModule
  ],
  providers: [
    CurrencyPipe,
    ProductService,
    CategoryService,
    CategoryListResolve,
    ProductListResolve,
    ProductDetailsResolve,
  ],
  declarations: [
    CartItemComponent,
    NavCartComponent,
    ProductListComponent,
    ProductCardComponent,
    ProductDetailsComponent,
    CategoryListComponent,
    CategoryCardComponent,
  ],
  exports: [
    ProductListComponent,
    ProductCardComponent,
    CategoryListComponent,
    NavCartComponent,
    CartItemComponent
  ]
})
export class CartModule { }
