import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleMapPickerComponent } from './google-map-picker.component';

describe('GoogleMapPickerComponent', () => {
  let component: GoogleMapPickerComponent;
  let fixture: ComponentFixture<GoogleMapPickerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoogleMapPickerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoogleMapPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
