import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProductDeliveryComponent } from './add-product-delivery.component';

describe('AddProductDeliveryComponent', () => {
  let component: AddProductDeliveryComponent;
  let fixture: ComponentFixture<AddProductDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProductDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProductDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
