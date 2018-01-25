import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {fadeInAnimation} from '../../../../pipes/animations';
@Component({
  animations: [fadeInAnimation],
  host: { '[@fadeInAnimation]': '' },
  selector: 'admin-product-list',
  template: `    
    <div class="row">
      <div class="col s6 m4">
        <mz-card class="add-product">
          <mz-card-content>
            <div class="valign-wrapper">
            <button mz-button (click)="newProduct()" style="width:100%;height: 200px" >
              <i mz-icon-mdi [icon]="'plus'"  [size]="'48px'"></i>
            </button>
            </div>
          </mz-card-content>
        </mz-card>

      </div>
      <ng-container *ngFor="let product of products">
        <div class="col s6 m4">
         <product-card [product]="product"></product-card>
        </div>
      </ng-container>

      
    </div>
  `,
  styles: []
})
export class AdminProductListComponent implements OnInit {
  @Input()
  products: Product[];
  @Input() count: number;
  constructor(private route: ActivatedRoute, private router: Router) { }

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

  newProduct() {
    this.router.navigate(['admin/product/0'])
  }


}
