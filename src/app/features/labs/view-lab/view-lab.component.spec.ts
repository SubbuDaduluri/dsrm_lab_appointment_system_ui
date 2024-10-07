import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewLabComponent } from './view-lab.component';

describe('ViewLabComponent', () => {
  let component: ViewLabComponent;
  let fixture: ComponentFixture<ViewLabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewLabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewLabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
