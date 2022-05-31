import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryParameterizationComponent } from './delivery-parameterization.component';

describe('DeliveryParameterizationComponent', () => {
  let component: DeliveryParameterizationComponent;
  let fixture: ComponentFixture<DeliveryParameterizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryParameterizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryParameterizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
