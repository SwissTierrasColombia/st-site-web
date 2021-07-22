import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportSnrComponent } from './report-snr.component';

describe('ReportSnrComponent', () => {
  let component: ReportSnrComponent;
  let fixture: ComponentFixture<ReportSnrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportSnrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportSnrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
