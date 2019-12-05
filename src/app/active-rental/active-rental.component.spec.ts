import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveRentalComponent } from './active-rental.component';

describe('ActiveRentalComponent', () => {
  let component: ActiveRentalComponent;
  let fixture: ComponentFixture<ActiveRentalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActiveRentalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActiveRentalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
