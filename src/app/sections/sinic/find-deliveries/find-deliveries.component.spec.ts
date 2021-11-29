import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FindDeliveriesComponent } from './find-deliveries.component';

describe('FindDeliveriesComponent', () => {
  let component: FindDeliveriesComponent;
  let fixture: ComponentFixture<FindDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FindDeliveriesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FindDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
