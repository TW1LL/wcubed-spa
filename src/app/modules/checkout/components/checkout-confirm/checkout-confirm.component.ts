import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {Order} from '../../../../../../../wcubed-api/src/models/checkout/order';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'checkout-confirm',
  template: `
    <mz-card [backgroundClass]="'blue-grey'">
      <mz-card-title>Confirm and Purchase</mz-card-title>
      <mz-card-content>
        <div class="white padding-lg">
            <checkout-stripe [paid]="paid"></checkout-stripe>
        </div>
      </mz-card-content>
    </mz-card>

  `,
  styles: []
})
export class CheckoutConfirmComponent implements OnInit {
  @Input() stepChange : EventEmitter<any>;
  @Input() changeStep: EventEmitter<[boolean, string]>;
  @Output() paid: EventEmitter<number> = new EventEmitter();
  order: Order;
  constructor(private orderService: OrderService, private route: ActivatedRoute,) { }

  ngOnInit() {
    this.order = this.route.snapshot.data['order'];
    this.awaitPaid();
  }

  getTotal() {
    return this.orderService.getTotal();
  }

  awaitPaid() {
    this.paid.subscribe((value) => {
      if (value) {
        this.changeStep.emit([true, 'next']);
      }
    })
  }

}
