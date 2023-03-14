import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyDriverPositionsComponent } from './my-driver-positions.component';

describe('MyDriverPositionsComponent', () => {
  let component: MyDriverPositionsComponent;
  let fixture: ComponentFixture<MyDriverPositionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyDriverPositionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyDriverPositionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
