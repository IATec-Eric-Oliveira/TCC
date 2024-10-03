import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageAccreditedComponent } from './garage-accredited.component';

describe('GarageAcreditedComponent', () => {
  let component: GarageAccreditedComponent;
  let fixture: ComponentFixture<GarageAccreditedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageAccreditedComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GarageAccreditedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
