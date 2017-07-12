import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <div class="navbar-fixed">
      <mz-navbar [navbarClass]="'blue-grey darken-1 container'">
        <img src="assets/cubed.png" style="height: 60px;"><a href="#" class="brand-logo"><span>w3</span></a>
        <mz-navbar-item-container [align]="'right'">
          <mz-navbar-item><a routerLink="/home">Home</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/product">Products</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/about">About</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/news">News</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/contact">Contact</a></mz-navbar-item>
          <nav-account-dropdown></nav-account-dropdown>
          <nav-cart></nav-cart>
        </mz-navbar-item-container>
      </mz-navbar>
    </div>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
