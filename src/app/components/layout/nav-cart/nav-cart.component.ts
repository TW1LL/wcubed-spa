import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nav-cart',
  template: `
    <mz-navbar-item><a routerLink="/cart"><i mz-icon-mdi [icon]="'cart'" [align]="'left'" [size]="'36px'"></i>( {{count}} )</a> </mz-navbar-item>
  `,
  styles: [`mz-navbar-item {
  
  }`]
})
export class NavCartComponent implements OnInit {
  count: number;
  constructor() {
    this.count = 0;
  }

  ngOnInit() {
  }

}
