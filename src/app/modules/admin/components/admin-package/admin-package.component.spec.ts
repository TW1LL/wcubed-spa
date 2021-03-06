import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPackageComponent } from './admin-package.component';

describe('AdminPackageComponent', () => {
  let component: AdminPackageComponent;
  let fixture: ComponentFixture<AdminPackageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPackageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPackageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
