import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckoutCardComponent } from './checkout-card.component';

describe('CheckoutCardComponent', () => {
  let component: CheckoutCardComponent;
  let fixture: ComponentFixture<CheckoutCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckoutCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckoutCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
