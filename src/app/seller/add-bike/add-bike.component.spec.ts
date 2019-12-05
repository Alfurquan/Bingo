import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBikeComponent } from './add-bike.component';

describe('AddBikeComponent', () => {
  let component: AddBikeComponent;
  let fixture: ComponentFixture<AddBikeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBikeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBikeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
