import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablecontrolComponent } from './tablecontrol.component';

describe('TablecontrolComponent', () => {
  let component: TablecontrolComponent;
  let fixture: ComponentFixture<TablecontrolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablecontrolComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablecontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
