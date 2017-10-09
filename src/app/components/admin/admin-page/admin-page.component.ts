import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'admin-page',
  template: `
    <div class="container">
      <div class="row">
        <div class="col m8 s12 right" [ngSwitch]="page">
          <admin-home *ngSwitchDefault></admin-home>
          <admin-product *ngSwitchCase="'product'"></admin-product>
          <admin-category *ngSwitchCase="'category'"></admin-category>
          <admin-order *ngSwitchCase="'order'"></admin-order>
          <admin-package *ngSwitchCase="'package'"></admin-package>
        </div>

        <div class=" col s12 m4 left">
          <mz-collection>
            <mz-collection-item><a routerLink="/admin/product">Products</a></mz-collection-item>
            <mz-collection-item><a routerLink="/admin/category">Categories</a></mz-collection-item>
            <mz-collection-item><a routerLink="/admin/order">Orders</a></mz-collection-item>
            <mz-collection-item><a routerLink="/admin/package">Packaging</a></mz-collection-item>
          </mz-collection>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class AdminPageComponent implements OnInit {
  page: string;
  constructor(private route: ActivatedRoute, private adminService: AdminService) { }

  ngOnInit() {
    console.log('thing');
    this.page = this.route.snapshot.data['page'].subscribe((page) => {
      console.log('new page');
      this.page = page;
    })
  }

}
