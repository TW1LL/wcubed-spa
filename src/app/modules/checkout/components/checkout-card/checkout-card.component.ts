import {Component, Input, OnInit} from '@angular/core';
import {OrderItem, Order} from '../../../../models';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'checkout-card',
  template: `
    <mz-card [backgroundClass]="'blue-grey lighten-2'">
      <mz-card-title>Checkout</mz-card-title>
      <mz-card-content>
        <div class="white padding-lg">
          <div *ngFor="let item of cart">
            <cart-item [item]="item"></cart-item>
          </div>
          <div class="collection">
            <mz-collection-item *ngIf="getShippingTotal() !== 'N/A'">
              Shipping Cost: <span class="right">{{ getShippingTotal()  | currency:'USD':true}}</span>
            </mz-collection-item>
            <mz-collection-item *ngIf="hasTax()">
              Tax: <span class="right">{{ getTax() | currency:'USD':true}}</span>
            </mz-collection-item>
            <mz-collection-item >
              Total: <span class="right">{{ getTotal() | currency:'USD':true}}</span>
            </mz-collection-item>
          </div>
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class CheckoutCardComponent{
    @Input() cart: OrderItem[];

    constructor(private orderService: OrderService) {}


    getShippingTotal() {
      return this.orderService.getShippingTotal();
    }

    getTotal() {
      return this.orderService.getTotal();
    }

    hasTax() {
      return this.orderService.hasTax;
    }

    getTax() {
      return this.orderService.getTax(this.orderService.getTotal(true));
    }


}
