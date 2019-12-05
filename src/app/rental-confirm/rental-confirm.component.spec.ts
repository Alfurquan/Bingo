import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalConfirmComponent } from './rental-confirm.component';

describe('RentalConfirmComponent', () => {
  let component: RentalConfirmComponent;
  let fixture: ComponentFixture<RentalConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RentalConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RentalConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
