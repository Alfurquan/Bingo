import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowbikesComponent } from './showbikes.component';

describe('ShowbikesComponent', () => {
  let component: ShowbikesComponent;
  let fixture: ComponentFixture<ShowbikesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowbikesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowbikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
