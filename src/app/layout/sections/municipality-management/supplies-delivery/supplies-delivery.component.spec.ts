import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuppliesDeliveryComponent } from './supplies-delivery.component';

describe('SuppliesDeliveryComponent', () => {
  let component: SuppliesDeliveryComponent;
  let fixture: ComponentFixture<SuppliesDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliesDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliesDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
