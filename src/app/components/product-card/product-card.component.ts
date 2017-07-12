import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../models';

@Component({
  selector: 'product-card',
  template: `
    <mz-card>
      <mz-card-title>
        {{product.name}}
      </mz-card-title>
      <mz-card-content>
        <img src="{{product.thumbnail}}" />
      </mz-card-content>
      <mz-card-action>
        <div class="row">
        <button mz-button class="col s6">
          <i mz-icon-mdi
          [align]="'left'"
          [icon]="'currency-usd'"></i>
          {{product.price}}
          
        </button>
        <button mz-button class="col s6">
          <i mz-icon-mdi
             [align]="'right'"
             [icon]="'shopping-cart'"></i>
          Add To Cart
        </button>
        </div>
      </mz-card-action>
    </mz-card>
  `,
  styles: [
    `mz-card-content {
        overflow: hidden;    
    }`,
    `mz-card-content img { 
      position: absolute;
      z-index: 0;
      width: 100%;
    }`,
    `mz-card-title {
        position: relative;
        bottom: 10px;
    }`
  ]
})
export class ProductCardComponent implements OnInit {
  @Input() product: Product;
  constructor() { }

  ngOnInit() {
  }

}
