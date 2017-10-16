import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WcubedAppComponent} from './components/wcubed-app/wcubed-app.component';
import {WcubedHomeComponent} from './components/wcubed-home/wcubed-home.component';
import {WcubedFooterComponent} from './components/wcubed-footer/wcubed-footer.component';
import {WCubedSectionComponent} from './components/wcubed-section/wcubed-section.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoadingService} from './services/loading.service';
import {MaterializeModule} from 'ng2-materialize';
import {RouterModule} from '@angular/router';
import {AdminModule} from '../admin/admin.module';
import {AccountModule} from '../account/account.module';
import {CartModule} from '../cart/cart.module';
import {CheckoutModule} from '../checkout/checkout.module';
import {appRoutes} from '../../app.routes';

@NgModule({
  imports: [
    CommonModule,
    MaterializeModule.forRoot(),
    RouterModule.forRoot(appRoutes, {enableTracing:true}),
    AdminModule,
    AccountModule,
    CartModule,
    CheckoutModule,
  ],
  providers: [
    LoadingService,
  ],
  declarations: [
    NavbarComponent,
    WCubedSectionComponent,
    WcubedFooterComponent,
    WcubedHomeComponent,
    WcubedAppComponent
  ],
  exports: [
    NavbarComponent,
    WcubedFooterComponent,
    WcubedAppComponent
  ]
})
export class FrameworkModule { }
