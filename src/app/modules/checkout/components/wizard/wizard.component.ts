import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {OrderItem} from '../../../../../../../wcubed-api/src/models/checkout/order.item';
import {Order} from '../../../../models';
import {ActivatedRoute, Router} from '@angular/router';
import {OrderService} from '../../services/order.service';

@Component({
  selector: 'wcubed-wizard',
  template: `
    <div class="row">
        <div class="col s12 wizard-nav center">
          <mz-card>
            <mz-card-content>
              <button mz-button [flat]="true" (click)="setStep(0)" [disabled]="step == 3">Address</button> >
              <button mz-button [flat]="true" (click)="setStep(1)" [disabled]="step == 0 || step == 3">Shipment</button> >
              <button mz-button [flat]="true" (click)="setStep(2)" [disabled]="step < 2 || step == 3">Confirm</button> >
              <button mz-button [flat]="true" (click)="setStep(3)" *ngIf="step == 3">Finalized</button>            
            </mz-card-content>
          </mz-card>

        </div>
        <div class="col s12 m7">
          <checkout-address [stepChange]="stepChange" [changeStep]="changeStep" *ngIf="step == 0"></checkout-address>
          <checkout-shipment [stepChange]="stepChange" [changeStep]="changeStep" *ngIf="step == 1"></checkout-shipment>
          <checkout-confirm [stepChange]="stepChange" [changeStep]="changeStep" *ngIf="step == 2"></checkout-confirm>
          <checkout-finalized [stepChange]="stepChange" [changeStep]="changeStep" *ngIf="step == 3"></checkout-finalized>
        </div>
        <div class="col s12 m5">
          <checkout-card [cart]="cart"></checkout-card>
          <div class="wizard-buttons">
            <mz-card>
              <mz-card-content>
                <div class="row">
                  <button mz-button class="col s6 blue-grey lighten-1" (click)="prevStep()" [disabled]="step == 0 || step == 3">Prev</button>
                  <button mz-button class="col s6 blue-grey darken-2" (click)="nextStep()" [disabled]="step == 3">Next</button>
                </div>
              </mz-card-content>
            </mz-card>
          </div>
        </div>
        
    </div>
  `,
  styles: []
})
export class WcubedWizardComponent implements OnInit {
  @Output() stepChange: EventEmitter<number> = new EventEmitter();
  @Output() changeStep: EventEmitter<string> = new EventEmitter();
  step: number = 0;
  order: Order;
  cart: OrderItem[];
  constructor(private route: ActivatedRoute, private orderService: OrderService, private router: Router) { }

  ngOnInit() {
    this.order = this.route.snapshot.data['order'];
    this.cart = this.order.items;
    this.getCart();
    this.awaitStepChange();
  }

  getCart() {
    this.orderService.getCart().subscribe((cart) => {
      if (cart.length == 0) {
        this.router.navigate(['home']);
      }
    });
  }
  prevStep() {
    if (this.step === 0 || this.step === 3) {
      return false;
    }
    this.stepChange.emit(this.step);
    this.step -= 1;
    return true;
  }
  nextStep() {
    if (this.step == 3) {
      return false;
    }
    this.stepChange.emit(this.step);
    this.step += 1;
    return true;
  }
  setStep(step) {
    this.stepChange.emit(this.step);
    this.step = step;
  }

  awaitStepChange() {
    this.changeStep.subscribe((direction) => {
      if (direction === 'next') {
        this.nextStep();
      } else {
        this.prevStep();
      }
    })
  }


}
