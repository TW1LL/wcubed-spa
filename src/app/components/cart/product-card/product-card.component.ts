import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../models';
import {TruncatePipe} from '../../../pipes/truncate';
import {fadeInAnimation} from '../../../pipes/animations';

@Component({
  selector: 'product-card',
  template: `
    <mz-card>
      <mz-card-content>
        <div class="img-wrapper"><span class="card-title">{{product.name}}</span><img src="assets/images/{{product.thumbnail}}" /></div>
        
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
            <button mz-button class="col s6 blue-grey lighten-2" (click) = gotoProduct(product)>View more Info</button>
            <button mz-button class="col s6 blue-grey darken-2">
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
    `@media (max-width: 1400px) {
      .img-wrapper {
        min-height: 150px;
      }
    }`,
  ],
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit() {}

  gotoProduct(product: Product) {
    //TODO: Angular Router --> Route to product details page
  }

}
