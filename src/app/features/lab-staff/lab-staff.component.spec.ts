import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabStaffComponent } from './lab-staff.component';

describe('LabStaffComponent', () => {
  let component: LabStaffComponent;
  let fixture: ComponentFixture<LabStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LabStaffComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
