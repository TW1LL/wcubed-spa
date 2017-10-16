import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserResolve} from './resolves/user.resolve';
import {UserService} from './services/user.service';
import {AccountLoginComponent} from './components/account-login/account-login.component';
import {AccountRegisterComponent} from './components/account-register/account-register.component';
import {AccountPageComponent} from './components/account-page/account-page.component';
import {AccountDropdownComponent} from './components/account-dropdown/account-dropdown.component';
import {MaterializeModule} from 'ng2-materialize';
import {appRoutes} from '../../app.routes';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterializeModule.forRoot(),
    RouterModule,
  ],
  providers: [
    UserResolve,
    UserService
  ],
  declarations: [
    AccountDropdownComponent,
    AccountLoginComponent,
    AccountRegisterComponent,
    AccountPageComponent,
  ],
  entryComponents: [
    AccountLoginComponent,
    AccountRegisterComponent
  ],
  exports: [
    AccountDropdownComponent
  ]
})
export class AccountModule { }
