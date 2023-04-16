import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintainNewsletterComponent } from './maintain-newsletter.component';

describe('MaintainNewsletterComponent', () => {
  let component: MaintainNewsletterComponent;
  let fixture: ComponentFixture<MaintainNewsletterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaintainNewsletterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaintainNewsletterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
