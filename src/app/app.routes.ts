import {OrderResolve} from './modules/checkout/resolves/order.resolve';
import {WcubedWizardComponent} from './modules/checkout/components/wizard/wizard.component';
import {ProductListResolve} from './modules/cart/resolves/product.resolve';
import {WcubedHomeComponent} from './modules/framework/components/wcubed-home/wcubed-home.component';
import {ProductDetailsResolve} from './modules/cart/resolves/productdetails.resolve';
import {ProductDetailsComponent} from './modules/cart/components/product-details/product-details.component';
import {ProductListComponent} from './modules/cart/components/product-list/product-list.component';
import {CategoryListResolve} from './modules/cart/resolves/category.resolve';
import {CategoryListComponent} from './modules/cart/components/category-list/category-list.component';
import {Routes} from '@angular/router';
import {AdminPageComponent} from './modules/admin/components/admin-page/admin-page.component';
import {AdminResolve} from './modules/admin/services/admin.resolve';
import {UserResolve} from './modules/account/resolves/user.resolve';
import {AccountPageComponent} from './modules/account/components/account-page/account-page.component';


export const appRoutes: Routes = [
  { path: 'product', component: CategoryListComponent, resolve: {categories: CategoryListResolve}},
  { path: 'product/cat/:category', component: ProductListComponent, resolve: {products: ProductListResolve}},
  { path: 'product/:id', component: ProductDetailsComponent, resolve: {product: ProductDetailsResolve}},
  { path: 'home', component: WcubedHomeComponent, resolve: {products: ProductListResolve}},
  { path: 'checkout', component: WcubedWizardComponent, resolve: {order: OrderResolve}},
  { path: 'checkout/:step', component: WcubedWizardComponent, resolve: {order: OrderResolve}},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: 'admin', component: AdminPageComponent, resolve: {page : AdminResolve}},
  { path: 'admin/:page', component: AdminPageComponent, resolve: {page: AdminResolve}},
  { path: 'admin/:page/:id', component: AdminPageComponent, resolve: {page: AdminResolve}},
  { path: 'user', component: AccountPageComponent, resolve: {page: UserResolve}},
  { path: 'user/:page', component: AccountPageComponent, resolve: {page: UserResolve}},
];
