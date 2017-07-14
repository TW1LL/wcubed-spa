import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {OrderItem} from '../../../models';
import {MzDropdownComponent} from 'ng2-materialize';
@Component({
  selector: 'nav-cart',
  template: `
    <mz-dropdown
      [id]="'cart-dropdown'" #dropdown
      [align]="'left'"
      [belowOrigin]="true"
      [constrainWidth]="false"
      [dropdownButtonId]="'cart-dropdown-link'"
      [gutter]="true"
      [hover]="false"
      [stopPropagation]="true"
    >
      <mz-dropdown-item *ngFor="let item of cart">
        <div class="collection">
          <mz-collection-item [avatar]="true">
            <img mz-avatar src="assets/images/{{item.product.thumbnail}}">
            <div class="title">{{item.product.name}}</div>
            <div>{{item.product.price | currency:'USD':true}}</div>
              
            <div>Quantity: {{item.quantity}} </div>
            <a mz-secondary-content (click)="removeFromCart(item)"><i mz-icon-mdi [icon]="'delete'"></i></a>
          </mz-collection-item>
        </div>
        <mz-dropdown-divider></mz-dropdown-divider>
      </mz-dropdown-item>
      <mz-dropdown-item *ngIf="count">
        <div class="checkout">
            <button mz-button class="blue-grey darken-2" routerLink="/checkout">Checkout</button>
        </div>
      </mz-dropdown-item>
    </mz-dropdown>
    
    <mz-navbar-item>
      <a id="cart-dropdown-link">
        <i mz-icon-mdi [icon]="'cart'" [align]="'left'" [size]="'36px'"></i>
        ( {{count}} )
      </a>
    </mz-navbar-item>
  `,
  styles: [`.checkout {
    padding:15px;
  }`,`button {width:100%}`]
})
export class NavCartComponent implements OnInit, AfterViewInit  {
  @ViewChild('dropdown') dropdown:MzDropdownComponent;
  count: number = 0;
  cart: OrderItem[];
  constructor(private orderService: OrderService) {

  }

  ngOnInit() {
    this.getCart();
  }

  ngAfterViewInit() {
  }
  getCart() {
    this.orderService.getCart().subscribe(cart => {
      this.cart = cart;
      const count = this.count;
      this.count = 0;
      this.cart.forEach(item => this.count += item.quantity);
      if(this.count > count) {
        this.dropdown.open();
        setTimeout(() => this.dropdown.close(), 1500);
      }


    });
  }

  removeFromCart(item: OrderItem) {
    this.orderService.removeFromCart(item);
  }

}
