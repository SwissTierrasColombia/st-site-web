import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsDeliveriesComponent } from './tabs-deliveries.component';

describe('TabsDeliveriesComponent', () => {
  let component: TabsDeliveriesComponent;
  let fixture: ComponentFixture<TabsDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
