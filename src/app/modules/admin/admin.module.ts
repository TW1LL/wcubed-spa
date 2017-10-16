import { NgModule } from '@angular/core';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {AdminResolve} from './services/admin.resolve';
import {AdminService} from './services/admin.service';
import {AdminPageComponent} from './components/admin-page/admin-page.component';
import {AdminHomeComponent} from './components/admin-home/admin-home.component';
import {AdminProductComponent} from './components/admin-product/admin-product.component';
import {AdminOrderComponent} from './components/admin-order/admin-order.component';
import {AdminCategoryComponent} from './components/admin-category/admin-category.component';
import {AdminPackageComponent} from './components/admin-package/admin-package.component';
import {AdminProductDetailsComponent} from './components/admin-product-details/admin-product-details.component';
import {AdminCategoryDetailsComponent} from './components/admin-category-details/admin-category-details.component';
import {MarkdownModule} from 'angular2-markdown';
import {MaterializeModule} from 'ng2-materialize';
import {CartModule} from '../cart/cart.module';
import {RouterModule} from '@angular/router';
import {appRoutes} from '../../app.routes';
import {ProductListComponent} from '../cart/components/product-list/product-list.component';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule.forRoot(),
    MaterializeModule.forRoot(),
    RouterModule,
    CartModule,

  ],
  providers: [
    CurrencyPipe,
    AdminService,
    AdminResolve,
  ],
  declarations: [
    AdminPageComponent,
    AdminHomeComponent,
    AdminProductComponent,
    AdminOrderComponent,
    AdminCategoryComponent,
    AdminPackageComponent,
    AdminProductDetailsComponent,
    AdminCategoryDetailsComponent,
  ]
})
export class AdminModule { }
