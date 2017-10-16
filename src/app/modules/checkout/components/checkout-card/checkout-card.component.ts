import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ActivatedRouteSnapshot} from '@angular/router';
import {OrderItem} from '../../../../models';

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
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class CheckoutCardComponent{
    @Input() cart;
}
