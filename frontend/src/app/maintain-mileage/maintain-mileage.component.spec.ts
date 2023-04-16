import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainMileageComponent } from './maintain-mileage.component';

describe('MaintainMileageComponent', () => {
  let component: MaintainMileageComponent;
  let fixture: ComponentFixture<MaintainMileageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainMileageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainMileageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
