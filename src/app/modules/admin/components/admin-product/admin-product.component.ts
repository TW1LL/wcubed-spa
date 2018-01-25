import {Component, Input, OnInit} from '@angular/core';
import {ProductService} from '../../../cart/services/product.service';
import {AdminService} from '../../services/admin.service';
import {Product} from '../../../../models';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'admin-product',
  template: `    
      <admin-product-list *ngIf="!product && !newProduct" [products]="products"></admin-product-list>
      <admin-product-details *ngIf="product || newProduct" [product]="product"></admin-product-details>
  `,
  styles: []
})
export class AdminProductComponent implements OnInit {
  product: Product;
  products: Product[];
  newProduct = false;
  constructor(private route: ActivatedRoute, private productService: ProductService) {

  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        if (params['id'] == 0) {
          this.newProduct = true;
          this.product = new Product();
        } else {
          this.productService.getProduct(params['id']).then(product => {
            this.product = product;
          });
        }
      } else {
        this.product = null;
        this.productService.getProducts().then(products => this.products = products);
      }
    })
  }
}
