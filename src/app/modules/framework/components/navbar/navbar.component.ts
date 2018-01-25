import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navbar',
  template: `
    <div class="navbar-fixed">
      
      <mz-navbar [navbarClass]="'blue-grey darken-1'">
        <button [float]="true" [flat]="true" mz-button [noWaves]="true" [id]="'sidenav-btn'" ngClass="{'show-on-large': false }"><i mz-icon-mdi [icon]="'menu'"></i></button>
        <mz-navbar-item-container>
          <mz-navbar-item><a href="#" style="height:100%"><img src="assets/cubed.png" style="height: 60px;"></a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/home">Home</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/product">Products</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/about">About</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/contact">Contact</a></mz-navbar-item>
        </mz-navbar-item-container>
        <nav-account-dropdown></nav-account-dropdown>
        <nav-cart></nav-cart>
        
      </mz-navbar>
    </div>
    <mz-sidenav [id]="'sidenav'"
                [collapseButtonId]="'sidenav-btn'">
      <mz-sidenav-link><a routerLink="/home">Home</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/product">Products</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/about">About</a></mz-sidenav-link>
      <mz-sidenav-link><a routerLink="/contact">Contact</a></mz-sidenav-link>
    </mz-sidenav>
  `,
  styles: []
})
export class NavbarComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
