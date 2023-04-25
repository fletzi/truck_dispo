import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableAllComponent } from './table-all.component';

describe('TableAllComponent', () => {
  let component: TableAllComponent;
  let fixture: ComponentFixture<TableAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
