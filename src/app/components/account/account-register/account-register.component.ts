import { Component, OnInit } from '@angular/core';
import {MzBaseModal} from 'ng2-materialize';
import {AuthService} from '../../../services/auth.service';
@Component({
  selector: 'account-register',
  template: `
    <mz-modal class="loginModal">
      <mz-modal-header>
        Register
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
                   length="150"
                   type="email"
                    [(ngModel)]="email">
          </mz-input-container>
          <mz-input-container class="col s12">
            <i mz-icon-mdi mz-input-prefix
               [icon]="'lock'">
            </i>
            <input mz-input
                   [label]="'Password'"
                   length="150"
                   type="password"
                   pattern=".{4,}"
                   [validate]="true"
                   [dataError]="'Password must be 4 characters minimum.'"
                   [dataSuccess]=""
                   [(ngModel)]="password">
          </mz-input-container>
          <mz-input-container class="col s12">
            <i mz-icon-mdi mz-input-prefix
               [icon]="'lock'">
            </i>
            <input mz-input
                   [label]="'Repeat Password'"
                   length="150"
                   type="password"
                   pattern=".{4,}"
                   [validate]="true"
                   [dataError]="'Passwords must match.'"
                   [dataSuccess]=""
                   [(ngModel)]="repeatPassword">
          </mz-input-container>
      </mz-modal-content>
      <mz-modal-footer>
        <button mz-button [flat]="true" mz-modal-close>Cancel</button>
        <button mz-button [ngClass]="{'blue-grey darken-1': valid, 'grey': !valid}" 
                (click)="register()"
                mz-tooltip
                [tooltip]="validMessage"
                [position]="'top'"
                [html]="true"
                [noWaves]="!valid"
                [delay]="0">
          Register</button>
      </mz-modal-footer>
    </mz-modal>
  `,
  styles: []
})

export class AccountRegisterComponent extends MzBaseModal {
  email: string = '';
  password: string = '';
  repeatPassword: string = '';
  constructor(private authService: AuthService) {
    super();

  }
  register() {
    if (this.valid) {
      this.authService.register({
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }).subscribe((result) => {
        if (result) {
          this.modalComponent.close();
        }
      })
    }
  }

  get valid() {
    return (this.repeatPassword === this.password
            && this.email.trim() != ""
            && this.password.trim() != ""
            && this.password.length > 3);
  }

  get validMessage() {
    return this.valid ? `<i mz-icon-mdi [align]="'left'"
               [icon]="'check'"></i>
               Passwords Match` :
      `<i mz-icon-mdi [align]="'left'"
               [icon]="'alert'"></i>
               Passwords Must Match`
  }
}
