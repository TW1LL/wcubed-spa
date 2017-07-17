import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {OrderService} from '../../../services/order.service';
import {CurrencyPipe} from '@angular/common';
import {OrderShipment} from '../../../models';

@Component({
  selector: 'checkout-shipment',
  template: `
    <mz-card [backgroundClass]="'blue-grey'"  *ngIf="shipments">
      <mz-card-title>Shipping</mz-card-title>
      <mz-card-content>
        <div *ngFor="let shipment of shipments" class="shipping-rates">
          <mz-collapsible
            [mode]="'expandable'">
            <mz-collapsible-item [active]="true">
              <mz-collapsible-item-header>
                <div class="collection">
                  <mz-collection-item [avatar]="true">
                    <img mz-avatar src="assets/images/{{shipment.product.thumbnail}}">
                    <div class="title">{{shipment.product.name}} - {{getSelectedRate(shipment)}}</div>
                  </mz-collection-item>
                </div>
              </mz-collapsible-item-header>
              <mz-collapsible-item-body>
                
                <mz-radio-button-container *ngFor="let rate of shipment.rates">
                  <input mz-radio-button
                         [label]="getRateTitle(rate)"
                         [withGap]="true"
                         [attr.id]="rate.id"
                         id="{{rate.id}}"
                         name="{{shipment.shipmentId}}"
                         [(ngModel)]="shipment.selectedRate"
                         value="{{rate.id}}"
                         type="radio">
                </mz-radio-button-container>
              </mz-collapsible-item-body>
            </mz-collapsible-item>
          </mz-collapsible>
        </div>
      </mz-card-content>
    </mz-card>
  `,
  styles: []
})
export class CheckoutShipmentComponent implements OnInit {
  @Input() stepChange : EventEmitter<any>;
  @Input() changeStep: EventEmitter<string>;
  shipments: any;
  selectedRates: any;
  constructor(private orderService: OrderService, private currencyPipe: CurrencyPipe) { }


  ngOnInit() {
    this.orderService.getRates().subscribe(shipments => {
      this.shipments = shipments;
      for (var i in this.shipments) {
          this.shipments[i].selectedRate = null;
      }
    });
    this.stepChange.subscribe((step) => {
      if (step == 1) {
        this.saveRates();
      }
    });
  }

  getRateTitle(rate) {
    return `${rate.carrier} ${rate.service} - ${this.currencyPipe.transform(rate.rate, rate.currency, true)}`;
  }
  getSelectedRate(shipment) {
    if (shipment.selectedRate != null) {
      return this.getRateTitle(shipment.rates.find(rate => rate.id == shipment.selectedRate));
    } else {
      return 'No Shipping Method Selected'
    }
  }

  saveRates() {
    const orderShipments = [];
    this.shipments.forEach(shipment => {
      orderShipments.push(new OrderShipment(shipment.shipmentId, shipment.selectedRate, shipment.rates.find(rate => rate.id = shipment.selectedRate).rate))
    })

    this.orderService.saveRates(orderShipments);


  }
}
