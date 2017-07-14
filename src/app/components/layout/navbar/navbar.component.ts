import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <div class="navbar-fixed">
      
      <mz-navbar [navbarClass]="'blue-grey darken-1'">
        <button [float]="true" [flat]="true" mz-button [noWaves]="true" [id]="'sidenav-btn'" ngClass="{'show-on-large': false }"><i mz-icon-mdi [icon]="'menu'"></i></button>
        <div class="container">
          <img src="assets/cubed.png" style="height: 60px;">
          <a href="#" class="brand-logo"><span>w3</span></a>
          <mz-navbar-item-container [align]="'right'">
            <mz-navbar-item><a routerLink="/home">Home</a></mz-navbar-item>
            <mz-navbar-item><a routerLink="/product">Products</a></mz-navbar-item>
            <mz-navbar-item><a routerLink="/about">About</a></mz-navbar-item>
            <mz-navbar-item><a routerLink="/news">News</a></mz-navbar-item>
            <mz-navbar-item><a routerLink="/contact">Contact</a></mz-navbar-item>
            <nav-account-dropdown></nav-account-dropdown>
            <nav-cart></nav-cart>
          </mz-navbar-item-container>
        </div>
        
      </mz-navbar>
    </div>
    <mz-sidenav [id]="'sidenav'"
                [collapseButtonId]="'sidenav-btn'">
      <mz-sidenav-header><h1>w3</h1></mz-sidenav-header>
      <mz-sidenav-link><a routerLink="/home">Home</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/product">Products</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/about">About</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/news">News</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/contact">Contact</a></mz-sidenav-link>
      <nav-account-dropdown></nav-account-dropdown>
      <nav-cart></nav-cart>
    </mz-sidenav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
