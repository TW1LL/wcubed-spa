import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {Address} from '../../../models';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'checkout-address',
  template: `
    <mz-card [backgroundClass]="'blue-grey'">
      <mz-card-title>Address</mz-card-title>
      <mz-card-content>
        <div class="white padding-lg">
          <mz-input-container>
            <input type="text" mz-input [label]="'Name'" [(ngModel)]="address.name" name="name">
          </mz-input-container>
          <mz-input-container *ngIf="!isLoggedIn()">
            <input type="text" mz-input [label]="'Email'" [(ngModel)]="address.email" name="email">
          </mz-input-container>
          <mz-input-container>
            <input type="text" mz-input [label]="'Street Address'" [(ngModel)]="address.street1" name="street1">
          </mz-input-container>          
          <mz-input-container>
            <input type="text" mz-input [label]="'Street Address 2'" [(ngModel)]="address.street2" name="street2">
          </mz-input-container>
          <mz-input-container>
            <input type="text" mz-input [label]="'City'" [(ngModel)]="address.city" name="city">
          </mz-input-container>
          <mz-input-container>
            <input type="text" mz-input [label]="'State'" [(ngModel)]="address.state" name="state">
          </mz-input-container>
          <mz-input-container>
            <input type="text" mz-input [label]="'Zipcode'" [(ngModel)]="address.zip" name="zip">
          </mz-input-container>
          
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class CheckoutAddressComponent implements OnInit {
  address: Address = new Address();
  @Input() stepChange : EventEmitter<any>;
  @Input() changeStep: EventEmitter<string> = new EventEmitter();
  constructor(private orderService: OrderService, private authService: AuthService) { }

  ngOnInit() {
    this.stepChange.subscribe((step) => {
      if(step == 0) {
        this.address.country = "US";
        this.orderService.addAddress(this.address)
      }
    });

  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
