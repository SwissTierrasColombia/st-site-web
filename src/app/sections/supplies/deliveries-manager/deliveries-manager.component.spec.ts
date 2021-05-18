import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveriesManagerComponent } from './deliveries-manager.component';

describe('DeliveriesManagerComponent', () => {
  let component: DeliveriesManagerComponent;
  let fixture: ComponentFixture<DeliveriesManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveriesManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveriesManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
