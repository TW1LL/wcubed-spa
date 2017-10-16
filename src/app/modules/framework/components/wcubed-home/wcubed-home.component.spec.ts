import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcubedHomeComponent } from './wcubed-home.component';

describe('WcubedHomeComponent', () => {
  let component: WcubedHomeComponent;
  let fixture: ComponentFixture<WcubedHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcubedHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcubedHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
