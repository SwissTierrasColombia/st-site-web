import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeliveriesComponent } from './view-deliveries.component';

describe('ViewDeliveriesComponent', () => {
  let component: ViewDeliveriesComponent;
  let fixture: ComponentFixture<ViewDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
