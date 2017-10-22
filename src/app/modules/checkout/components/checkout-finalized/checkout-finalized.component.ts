import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {OrderService} from '../../services/order.service';
import {OrderStatus, OrderColor} from '../../../../constants/index';

@Component({
  selector: 'checkout-finalized',
  template: `
    <mz-card [backgroundClass]="'blue-grey'">
      <mz-card-title>{{title}}</mz-card-title>
      <mz-card-content>
        <div class="finalize-indicator row center-align">
          <mz-spinner *ngIf="status != 'finalized'"
            [color]="color"
            [size]="'big'" class="col s12">
          </mz-spinner>
          <i *ngIf="status == 'finalized'" 
             mz-icon-mdi 
             [icon]="'checkbox-marked-circle'" 
             [size]="'48px'">
          </i>
          <div class="col s12 white-text">
            {{getStatus()}}
          </div>
          <div *ngIf="confirmNumber">
            <h3>Confirmation Number:</h3>
            {{confirmNumber}}
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
  confirmNumber: string;
  constructor(private orderService: OrderService) { }

  ngOnInit() {
    this.orderService.finalize().subscribe((status) => {
      console.log(this.status);
        this.status = status;
        this.color = OrderColor[status];
        if (status == 'finalized') {
          this.orderService.getOrderPromise().then((order) => this.confirmNumber = order.confirmNumber);
          this.title = 'Order Confirmed!';
        }
    });
  }

  getStatus() {
    return OrderStatus[this.status];
  }




}


