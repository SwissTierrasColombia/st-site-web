import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePeriodsComponent } from './create-periods.component';

describe('CreatePeriodsComponent', () => {
  let component: CreatePeriodsComponent;
  let fixture: ComponentFixture<CreatePeriodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatePeriodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePeriodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
