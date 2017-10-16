import { Component, OnInit } from '@angular/core';
import {MzBaseModal} from 'ng2-materialize';
import {UserService} from '../../services/user.service';
@Component({
  selector: 'account-register',
  template: `
    <mz-modal class="loginModal">
      <mz-modal-header>
        Register
      </mz-modal-header>
      <mz-modal-content>
        <div class="errorCard">
          <mz-card *ngIf="hasError">
            <mz-card-content>
              <div class="row">
              <i mz-icon-mdi [icon]="'alert'" class="col s2"></i>
              <ul class="col s10">
                <li *ngFor="let message of errorMessage">{{message}}</li>
              </ul>
              </div>
            </mz-card-content>
          </mz-card>
        </div>
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
  hasError: boolean;
  errorMessage: string[] = [];
  constructor(private userService: UserService) {
    super();

  }
  register() {
    if (this.valid) {
      this.userService.register({
        email: this.email,
        password: this.password,
        repeatPassword: this.repeatPassword
      }).subscribe((data) => {
        if (data.result) {
          this.hasError = false;
          this.modalComponent.close();
        } else {
          this.hasError = true;
          this.errorMessage = data.message;
        }
      })
    } else {
      this.hasError = true;
      this.errorMessage = [];
      if (this.email.trim() == "") {
        this.errorMessage.push('Email must be valid.');
      }
      if (this.repeatPassword !== this.password) {
        this.errorMessage.push('Passwords must match.');
      }
      if (this.repeatPassword.length < 4) {
        this.errorMessage.push('Password must be at least 4 characters');
      }
    }
  }

  get valid() {
    return (this.repeatPassword === this.password
            && this.email.trim() != ""
            && this.password.trim() != ""
            && this.password.length > 3);
  }

  get validMessage() {
    if(this.email.trim())
    return this.valid ? '' : 'Registration must be valid.'
  }
}
