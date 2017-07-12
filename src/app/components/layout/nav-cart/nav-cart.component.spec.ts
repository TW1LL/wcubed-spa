import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavCartComponent } from './nav-cart.component';

describe('NavCartComponent', () => {
  let component: NavCartComponent;
  let fixture: ComponentFixture<NavCartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavCartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavCartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
