import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Product} from '../../../models';

@Component({
  selector: 'product-details',
  template: `
    <div class="row">
      <div class="col s12 m6">
        <mz-card>
          <mz-card-content>
            <img src="assets/images/{{currentImage}}" style="width:100%">
          </mz-card-content>
        </mz-card>
      </div>
      <div class="col s12 m6">
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
              <button mz-button class="col s6 blue-grey darken-2" (click)="addToCart(product)">
                <i mz-icon-mdi
                   [align]="'right'"
                   [icon]="'cart'"></i>
                Add to Cart
              </button>
            </div>
          </mz-card-content>
        </mz-card>
        <mz-card>
          <mz-card-content>
            <div class="row">
              <div class="col s3">
                <img src="assets/images/{{product.thumbnail}}" style="width:100%" (click)="changeImage(product.thumbnail)">
              </div>
              <div class="col s3" *ngFor="let image of product.images">
                <img src="assets/images/{{image}}" style="width: 100%" (click)="changeImage(image)">
              </div>
            </div>
          </mz-card-content>
        </mz-card>
      </div>
    </div>
  `,
  styles: []
})
export class ProductDetailsComponent implements OnInit {
  product: Product;
  currentImage: string
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.product = this.route.snapshot.data['product'];
    this.currentImage = this.product.thumbnail;
    this.product.images = JSON.parse(this.product.images);
  }

  changeImage(image: string) {
    this.currentImage = image;
  }
}
