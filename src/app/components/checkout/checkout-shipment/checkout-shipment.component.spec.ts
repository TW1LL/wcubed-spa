import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutShipmentComponent } from './checkout-shipment.component';

describe('CheckoutShipmentComponent', () => {
  let component: CheckoutShipmentComponent;
  let fixture: ComponentFixture<CheckoutShipmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutShipmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutShipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
