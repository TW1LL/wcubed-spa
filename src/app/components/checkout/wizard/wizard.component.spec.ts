import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WcubedWizardComponent } from './wizard.component';

describe('WcubedWizardComponent', () => {
  let component: WcubedWizardComponent;
  let fixture: ComponentFixture<WcubedWizardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WcubedWizardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WcubedWizardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
