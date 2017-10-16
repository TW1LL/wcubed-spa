import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models';
import {ActivatedRoute} from '@angular/router';
import {fadeInAnimation} from '../../../../pipes/animations';
@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  selector: 'admin-product-list',
  template: `    
    <div class="row">
      <ng-container *ngFor="let product of products">
        <div class="col s6 m4">
         <product-card [product]="product"></product-card>
        </div>
      </ng-container>
    </div>
  `,
  styles: ['']
})
export class AdminProductListComponent implements OnInit {
  @Input()
  products: Product[];
  @Input() count: number;
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    if (!this.products) {
      this.getProducts();
    }
  }

  getProducts() {
    this.products = this.route.snapshot.data['products'];
    if (this.products) {
      this.products = this.products.slice(0, this.count || this.products.length);
    }

  }


}
