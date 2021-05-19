import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeDeliveryManagerComponent } from './make-delivery-manager.component';

describe('MakeDeliveryManagerComponent', () => {
  let component: MakeDeliveryManagerComponent;
  let fixture: ComponentFixture<MakeDeliveryManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakeDeliveryManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakeDeliveryManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
