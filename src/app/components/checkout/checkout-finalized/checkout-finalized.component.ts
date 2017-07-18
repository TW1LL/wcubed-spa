import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {OrderService, OrderStatus} from '../../../services/order.service';

@Component({
  selector: 'checkout-finalized',
  template: `
    <mz-card [backgroundClass]="'blue-grey'">
      <mz-card-title>{{title}}</mz-card-title>
      <mz-card-content>
        <div class="finalize-indicator row valign-wrapper">
          <mz-spinner *ngIf="status != 'finalized'"
            [color]="color"
            [size]="'big'" class="col s12 valign">
          </mz-spinner>
          <div class="col s12 center-align valign">
            {{getStatus()}}
          </div>
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class CheckoutFinalizedComponent implements OnInit {
  @Input() stepChange : EventEmitter<any>;
  @Input() changeStep: EventEmitter<string>;
  status: string;
  color = 'white';
  title = 'Finalizing Order...';
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.finalize().subscribe((status) => {
      console.log(this.status);
        this.status = status;
        this.color = Color[status];
        if (status == 'finalized') {
          this.title = 'Order Confirmed!';
        }
    });
  }

  getStatus() {
    return OrderStatus[this.status];
  }




}

const Color = {
  'created': 'blue-grey lighten-3',
  'address': 'blue-grey lighten-2',
  'shipment': 'blue-grey lighten-1',
  'confirm': 'white',
  'shipping' : 'grey',
  'paying' : 'yellow',
  'finalized': 'green'
}

