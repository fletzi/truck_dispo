import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDriverPositionComponent } from './edit-driver-position.component';

describe('EditDriverPositionComponent', () => {
  let component: EditDriverPositionComponent;
  let fixture: ComponentFixture<EditDriverPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditDriverPositionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditDriverPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
