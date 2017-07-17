import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutFinalizedComponent } from './checkout-finalized.component';

describe('CheckoutFinalizedComponent', () => {
  let component: CheckoutFinalizedComponent;
  let fixture: ComponentFixture<CheckoutFinalizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutFinalizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutFinalizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
