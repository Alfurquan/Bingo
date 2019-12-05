import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentBillingComponent } from './rent-billing.component';

describe('RentBillingComponent', () => {
  let component: RentBillingComponent;
  let fixture: ComponentFixture<RentBillingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentBillingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
