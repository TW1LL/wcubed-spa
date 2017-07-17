import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutConfirmComponent } from './checkout-confirm.component';

describe('CheckoutConfirmComponent', () => {
  let component: CheckoutConfirmComponent;
  let fixture: ComponentFixture<CheckoutConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
