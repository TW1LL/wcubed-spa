import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'product-card',
  template: `
    <mz-card>
      <mz-card-content>
        <div class="img-wrapper">
          <a routerLink="/product/{{product.id}}"> 
            <span class="card-title">{{product.name}}</span>
            <img src="assets/images/{{product.thumbnail}}" />
          </a>
        </div>
        
        <div class="buttons">
          <div class="row">
            <button mz-button class="col s6 blue-grey lighten-1">
              {{product.price | currency:'USD': true}}
            </button>
            <button mz-button [ngClass] = "product.onHand == 0 ? 'red' : 'blue-grey '" class="col s6 darken-3">
              {{product.onHand > 25 ? '' : product.onHand}} IN STOCK
            </button>
          </div>
          <div class="row">
            <button mz-button class="col s6 blue-grey lighten-2" routerLink="/product/{{product.id}}">View more Info</button>
            <button mz-button class="col s6 blue-grey darken-2" (click)="addToCart(product)">
              <i mz-icon-mdi
                 [align]="'right'"
                 [icon]="'cart'"></i>
              Add to Cart
            </button>
          </div>
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: [
    `.buttons {
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
      position: relative;
      min-height:300px;
      transition: min-height 0.5s;
    }`,
    `.img-wrapper a {
      color: #333;
    }`,
    `@media (max-width: 1400px) {
      .img-wrapper {
        min-height: 150px;
      }
    }`,
  ],
})
export class ProductCardComponent {
  @Input() product: Product;

  constructor(private orderService: OrderService) {}
  addToCart(product: Product) {
    this.orderService.addToCart(product);
  }

}
