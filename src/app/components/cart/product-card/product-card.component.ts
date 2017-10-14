import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models';
import {OrderService} from '../../../services/order.service';
import {AdminService} from '../../../services/admin.service';

@Component({
  selector: 'product-card',
  template: `
    <mz-card>
      <mz-card-content>
        <div class="flex-wrapper">
          <div class="img-wrapper flex-grow">
            <a routerLink="/product/{{product.id}}"> 
              <span class="card-title">{{product.name}}</span>
              <img src="assets/images/{{product.thumbnail}}" />
            </a>
          </div>
          
          <div class="buttons white">
            <div class="row">
              <button mz-button class="col s6 blue-grey lighten-1">
                {{product.price | currency:'USD': true}}
              </button>
              <button mz-button [ngClass] = "product.onHand == 0 ? 'red' : 'blue-grey '" class="col s6 darken-3">
                {{product.onHand > 25 ? '' : product.onHand}} IN STOCK
              </button>
            </div>
            <div class="row">
              <button mz-button [ngClass] = "isAdmin ? 's4' : 's6'" class="col blue-grey lighten-2" routerLink="/product/{{product.id}}">View more Info</button>
              <button mz-button [ngClass] = "isAdmin ? 's4' : 's6'" class="col blue-grey darken-2" (click)="addToCart()">
                <i mz-icon-mdi
                   [align]="'right'"
                   [icon]="'cart'"></i>
                Add to Cart
              </button>
              <button mz-button *ngIf="isAdmin" class="col s4 blue-grey lighten-1" routerLink="/admin/product/{{product.id}}">Edit</button>
            </div>
          </div>
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: [
    `.buttons {
        background-color: white;
        padding: 5px;
        z-index: 1;
    }`,
    `.buttons .row {
        margin-bottom: 0;
    }`,
    `.buttons button .btn {
      padding: 5px;
      height: 45px;
    }`,
    `.img-wrapper {
      overflow:hidden;
      position: relative;
      transition: min-height 0.5s;
    }`,
    `.img-wrapper a {
      color: #333;
    }`
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  isAdmin: boolean;
  constructor(private orderService: OrderService, private adminService: AdminService) {}

  ngOnInit() {
    this.adminService.getPermissions().then(() => this.isAdmin = true).catch(() => this.isAdmin = false);;
  }

  addToCart() {
    this.orderService.addToCart(this.product);
  }

}
