import {OrderResolve} from './services/resolves/order.resolve';
import {WcubedWizardComponent} from './components/checkout/wizard/wizard.component';
import {ProductListResolve} from './services/resolves/product.resolve';
import {WcubedHomeComponent} from './components/layout/wcubed-home/wcubed-home.component';
import {ProductDetailsResolve} from './services/resolves/productdetails.resolve';
import {ProductDetailsComponent} from './components/cart/product-details/product-details.component';
import {ProductListComponent} from './components/cart/product-list/product-list.component';
import {CategoryListResolve} from './services/resolves/category.resolve';
import {CategoryListComponent} from './components/cart/category-list/category-list.component';
import {Routes} from '@angular/router';
import {AdminPageComponent} from './components/admin/admin-page/admin-page.component';
import {AdminResolve} from './services/resolves/admin.resolve';
import {UserResolve} from './services/resolves/user.resolve';
import {AccountPageComponent} from './components/account/account-page/account-page.component';


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
  { path: 'user', component: AccountPageComponent, resolve: {page: UserResolve}},
  { path: 'user/:page', component: AccountPageComponent, resolve: {page: UserResolve}},
];
