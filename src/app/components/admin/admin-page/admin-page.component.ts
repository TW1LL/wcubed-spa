import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'admin-page',
  template: `
    <div>
      <mz-navbar [navbarClass]="'blue-grey lighten-1'">
        <mz-navbar-item-container>
          <mz-navbar-item><a routerLink="/admin/product">Products</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/admin/category">Categories</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/admin/order">Orders</a></mz-navbar-item>
          <mz-navbar-item><a routerLink="/admin/package">Packaging</a></mz-navbar-item>
        </mz-navbar-item-container>
      </mz-navbar>
    </div>
      <div [ngSwitch]="page">
        <admin-home *ngSwitchDefault></admin-home>
        <admin-product *ngSwitchCase="'product'"></admin-product>
        <admin-category *ngSwitchCase="'category'"></admin-category>
        <admin-order *ngSwitchCase="'order'"></admin-order>
        <admin-package *ngSwitchCase="'package'"></admin-package>
      </div>

  `,
  styles: []
})
export class AdminPageComponent implements OnInit {
  page: string;
  id: number;
  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.page = params['page'];
    })
  }

}
