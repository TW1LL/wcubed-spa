import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WCubedSectionComponent } from './wcubed-section.component';

describe('WCubedSectionComponent', () => {
  let component: WCubedSectionComponent;
  let fixture: ComponentFixture<WCubedSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WCubedSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WCubedSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
