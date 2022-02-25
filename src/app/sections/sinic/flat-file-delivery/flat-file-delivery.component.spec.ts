import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatFileDeliveryComponent } from './flat-file-delivery.component';

describe('FlatFileDeliveryComponent', () => {
  let component: FlatFileDeliveryComponent;
  let fixture: ComponentFixture<FlatFileDeliveryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatFileDeliveryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatFileDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
