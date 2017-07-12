import { Component, OnInit } from '@angular/core';
import {Product} from '../../models';
import {ProductService} from '../../services/product.service';
@Component({
  selector: 'product-list',
  template: `    
    <div class="row">
      <div class="col s4" *ngFor="let product of products">
        <product-card [product] = product></product-card>
      </div>
    </div>
  `,
  styles: ['']
})
export class ProductListComponent implements OnInit {
  products: Product[];
  errorMessage: string;
  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      products => {this.products = products; console.log('hello', products)},
      error => this.errorMessage = <any>error
    )
  }


}
