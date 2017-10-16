import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Address} from '../../../../models';
import {UserService} from '../../../account/services/user.service';

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
  @Input() stepChange : EventEmitter<[number, boolean, string]>;
  @Input() changeStep: EventEmitter<[boolean, number]> = new EventEmitter();
  constructor(private orderService: OrderService, private userService: UserService) { }

  ngOnInit() {
    this.createAddressObj();

    this.stepChange.subscribe(([step, validate, direction]) => {
      if (validate && step == 0 ) {
        const valid = this.validation();
        if (valid) {
          this.address.country = "US";
          this.orderService.addAddress(this.address);
        }
        this.changeStep.emit([valid, direction]);
      } else if (step == 0) {
        this.changeStep.emit([true, direction]);
      }
    });

  }

  isLoggedIn() {
    return this.userService.isLoggedIn();
  }

  createAddressObj() {
    this.address.name = '';
    this.address.email = '';
    this.address.street1 = '';
    this.address.street2 = '';
    this.address.city = '';
    this.address.state = '';
    this.address.zip = '';

  }
  validation() {
    return !(!this.address.name && !this.address.email && !this.address.street1 && !this.address.street2 && !this.address.city && !this.address.state && !this.address.zip);

  }

}
