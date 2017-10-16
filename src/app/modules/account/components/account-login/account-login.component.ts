import { Component, OnInit } from '@angular/core';
import {MzBaseModal} from 'ng2-materialize';
import {UserService} from '../../services/user.service';


@Component({
  selector: 'account-login',
  template: `
    <mz-modal class="loginModal">
      <mz-modal-header>
        Login
      </mz-modal-header>
      <mz-modal-content>
        <div class="errorCard">
          <mz-card *ngIf="hasError">
            <mz-card-content>
              <i mz-icon-mdi [icon]="'alert'" [align]="'left'"></i>
              {{errorMessage}}
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
  hasError: boolean;
  errorMessage: string;
  constructor(private userService: UserService) {
    super();

  }
  login() {
    this.userService.login({email:this.email, password: this.pass}).subscribe((data) => {
      if (data.result) {
        this.hasError = false;
        this.modalComponent.close();
      } else {
        this.hasError = true;
        this.errorMessage = data.message;
      }
    })
  }
}
