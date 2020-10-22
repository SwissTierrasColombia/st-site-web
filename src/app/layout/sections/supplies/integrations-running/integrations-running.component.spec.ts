import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsRunningComponent } from './integrations-running.component';

describe('IntegrationsRunningComponent', () => {
  let component: IntegrationsRunningComponent;
  let fixture: ComponentFixture<IntegrationsRunningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationsRunningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsRunningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
