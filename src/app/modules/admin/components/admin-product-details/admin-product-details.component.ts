import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../cart/services/product.service';
import {Product} from '../../../../models';

@Component({
  selector: 'admin-product-details',
  template: `    
    <mz-card>
      <mz-card-title>
        {{product.name}}
      </mz-card-title>
      <mz-card-content>
        <div class="row">
          <div class="col s12">
            <markdown [data]="product.description">
            </markdown>
          </div>
          <button mz-button class="col s6 blue-grey lighten-1">
            {{product.price | currency:'USD': true}}
          </button>
        </div>
      </mz-card-content>
    </mz-card>
    <mz-card>
      <mz-card-content>
        <div class="row">
          <div class="col s3">
            <img src="assets/images/{{product.thumbnail}}" style="width:100%">
          </div>
          <div class="col s3" *ngFor="let image of product.images">
            <img src="assets/images/{{image}}" style="width: 100%">
          </div>
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class AdminProductDetailsComponent implements OnInit {
  @Input()
  product: Product;
  constructor(private productService: ProductService) { }

  ngOnInit() {

  }

}
