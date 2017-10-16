import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcubedAppComponent } from './wcubed-app.component';

describe('WcubedAppComponent', () => {
  let component: WcubedAppComponent;
  let fixture: ComponentFixture<WcubedAppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcubedAppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcubedAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
