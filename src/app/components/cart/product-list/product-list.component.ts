import {Component, Input, OnInit} from '@angular/core';
import {Product, Category} from '../../../models';
import {ProductService} from '../../../services/product.service';
import {ActivatedRoute} from '@angular/router';
import {fadeInAnimation} from '../../../pipes/animations';
@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
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
  @Input()
  products: Product[];
  @Input() count: number;
  @Input() category: Category;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.products) {
      this.getProducts();
    }
  }

  getProducts() {
    this.products = this.route.snapshot.data['products'];
    if (this.products) {
      if (this.category != null) {
        this.products = this.products.filter(product => product.category == this.category);
      }
      this.products = this.products.slice(0, this.count || this.products.length);
    }

  }


}
