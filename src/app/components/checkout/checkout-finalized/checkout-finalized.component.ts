import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';

@Component({
  selector: 'checkout-finalized',
  template: `
    <p>
      checkout-finalized Works!
    </p>
  `,
  styles: []
})
export class CheckoutFinalizedComponent implements OnInit {
  @Input() stepChange : EventEmitter<any>;
  @Input() changeStep: EventEmitter<string>;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.finalize().subscribe((stuff) => console.log('doing stuff'));
  }

}
