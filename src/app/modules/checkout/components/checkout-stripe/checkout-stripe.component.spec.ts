import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutStripeComponent } from './checkout-stripe.component';

describe('CheckoutStripeComponent', () => {
  let component: CheckoutStripeComponent;
  let fixture: ComponentFixture<CheckoutStripeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutStripeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutStripeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
