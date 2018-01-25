import { Component, OnInit } from '@angular/core';
import {MzModalService} from 'ng2-materialize';
import {AccountLoginComponent} from '../account-login/account-login.component';
import {UserService} from '../../services/user.service';
import {AccountRegisterComponent} from '../account-register/account-register.component';

@Component({
  selector: 'nav-account-dropdown',
  template: `
    <mz-dropdown
      [id]="'dropdown'"
      [align]="'left'"
      [belowOrigin]="true"
      [constrainWidth]="false"
      [dropdownButtonId]="'btn-dropdown'"
      [gutter]="true"
      [hover]="false"
      [inDuration]="300"
      [outDuration]="300"
      [stopPropagation]="true"
    >
      <mz-dropdown-item *ngIf="!isLoggedIn"><a (click)="openRegister()">Register</a></mz-dropdown-item>
      <mz-dropdown-item *ngIf="!isLoggedIn"><a (click)="openLogin()">Login</a></mz-dropdown-item>
      <mz-dropdown-item *ngIf="isLoggedIn"><a routerLink="/user">Account</a></mz-dropdown-item>
      <mz-dropdown-item *ngIf="isLoggedIn"><a (click)="logout()">Logout</a></mz-dropdown-item>
        
    </mz-dropdown>
    <div class="right" ><a id="btn-dropdown">{{navText}} <i mz-icon-mdi [align]="'right'" [icon]="'arrow-down-drop-circle-outline'"></i> </a></div>
  `,
  styles: []
})
export class AccountDropdownComponent implements OnInit {
  isLoggedIn: boolean = false;
  navText: string = 'User';
  constructor(private modalService: MzModalService, private userService: UserService) {
  }

  ngOnInit() {
    $(document).on('click','nav #dropdown', function (e) {
      e.stopPropagation();
    });
    let user = this.userService.getUser();
    if (user) {
      this.updateUser(user);
    }
    this.userService.getUserObservable().subscribe((user) => {
      this.updateUser(user);
    });
  }

  updateUser(user) {
    this.isLoggedIn = !!user;
    if (user) {
      this.navText = user.email;
    } else {
      this.navText = 'User';
    }
  }
  openLogin() {
    this.modalService.open(AccountLoginComponent);
  }

  openRegister() {
    this.modalService.open(AccountRegisterComponent);
  }

  logout() {
    this.userService.logout();
  }




}
