import { Component, OnInit } from '@angular/core';
import {MzBaseModal} from 'ng2-materialize';
import {AuthService} from '../../../services/auth.service';


@Component({
  selector: 'account-login',
  template: `
    <mz-modal class="loginModal">
      <mz-modal-header>
        Login
      </mz-modal-header>
      <mz-modal-content>
        <mz-input-container class="col s12">
          <i mz-icon-mdi mz-input-prefix
             [icon]="'email'">
          </i>
          <input mz-input
                 [label]="'Email'"
                 [validate]="true"
                 [dataError]="'Email is invalid'"
                 [dataSuccess]="'Valid Email'"
                 id="email"
                 [(ngModel)]="email"
                 length="150"
                 type="email">
        </mz-input-container>
        <mz-input-container class="col s12">
          <i mz-icon-mdi mz-input-prefix
             [icon]="'lock'">
          </i>
          <input mz-input
                 [label]="'Password'"
                 [(ngModel)]="pass"
                 length="150"
                 type="password">
        </mz-input-container>
      </mz-modal-content>
      <mz-modal-footer>
        <button mz-button [flat]="true" mz-modal-close>Cancel</button>
        <button mz-button class="blue-grey lighten-1"  (click)="login()">Login</button>
      </mz-modal-footer>
    </mz-modal>
  `,
  styles: []
})
export class AccountLoginComponent extends MzBaseModal {
  email: string;
  pass: string;
  constructor(private authService: AuthService) {
    super();

  }
  login() {
    this.authService.login({email:this.email, password: this.pass}).subscribe((result) => {
      if (result) {
        this.modalComponent.close();
      }
    })
  }
}
