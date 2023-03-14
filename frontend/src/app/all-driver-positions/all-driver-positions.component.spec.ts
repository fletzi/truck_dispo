import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDriverPositionsComponent } from './all-driver-positions.component';

describe('AllDriverPositionsComponent', () => {
  let component: AllDriverPositionsComponent;
  let fixture: ComponentFixture<AllDriverPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllDriverPositionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDriverPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
