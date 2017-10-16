import {Component, Input, OnInit} from '@angular/core';
import {OrderItem} from '../../../../models';
import {OrderService} from '../../../checkout/services/order.service';

@Component({
  selector: 'cart-item',
  template: `
    <div class="collection">
      <mz-collection-item [avatar]="true">
        <img mz-avatar src="assets/images/{{item.product.thumbnail}}">
        <div class="title">{{item.product.name}}</div>
        <div>{{item.product.price | currency:'USD':true}}</div>

        <div>Quantity: {{item.quantity}} </div>
        <a mz-secondary-content (click)="removeFromCart(item)"><i mz-icon-mdi [icon]="'delete'"></i></a>
      </mz-collection-item>
    </div>
  `,
  styles: []
})
export class CartItemComponent implements OnInit {
  @Input() item: OrderItem;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
  }

  removeFromCart(item: OrderItem) {
    this.orderService.removeFromCart(item);
  }
}
