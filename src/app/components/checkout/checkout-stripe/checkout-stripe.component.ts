import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderService} from '../../../services/order.service';
declare let Stripe: any;
@Component({
  selector: 'checkout-stripe',
  template: `    
    <div class="payment-card" *ngIf="!paymentAccepted">
      <div class="row">
        <div class="col s12">
            <label for="card-element">
                Credit or debit card
            </label>
            <div id="card-element">
            </div>
        </div>
      
        <div id="card-errors" role="alert" class="col s12">{{errors}}</div>
        <button mz-button (click)="createToken()" class="col s12 blue-grey">Confirm and Pay</button>
      </div>
    </div>
    <div *ngIf="paymentAccepted">
      Payment Accepted! Move along
    </div>
  `,
  styles: [`.StripeElement {
    background-color: white;
    padding: 8px 12px;
    border-radius: 4px;
    border: 1px solid rgba(0,0,0,0.05);
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
    margin-bottom: 10px;
  }`, `
  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }`,`
  .StripeElement--invalid {
    border-color: #fa755a;
  }`,`
  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }`]
})
export class CheckoutStripeComponent implements AfterViewInit {
  stripe: any;
  elements: any;
  errors: string;
  card: any;
  paymentAccepted: boolean = false;
  @Input() paid: EventEmitter<boolean>;
  constructor(private orderService: OrderService) {
    this.stripe = Stripe('pk_test_r35FPOANG4zWRzwIpjKe47Cw');
    this.elements = this.stripe.elements();
  }

  ngAfterViewInit() {
    let style = {
      base: {
        color: '#32325d',
        lineHeight: '24px',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: 'antialiased',
        fontSize: '16px',
        '::placeholder': {
          color: '#aab7c4'
        }
      },
      invalid: {
        color: '#fa755a',
        iconColor: '#fa755a'
      }
    };
    this.card = this.elements.create('card', {style: style});
    this.card.mount('#card-element');
    this.card.addEventListener('change', (event) => this.errors = event.error ? event.error.message : '');

  }

  createToken() {
    this.stripe.createToken(this.card).then((result) => {
      if (result.error) {
        this.errors = result.error.message;
      } else {
        this.orderService.createPayment(result.token);
        this.paymentAccepted = true;
        this.paid.emit(true);
      }
    })
  }

}
