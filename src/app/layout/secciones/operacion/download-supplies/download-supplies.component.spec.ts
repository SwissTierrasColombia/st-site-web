import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadSuppliesComponent } from './download-supplies.component';

describe('DownloadSuppliesComponent', () => {
  let component: DownloadSuppliesComponent;
  let fixture: ComponentFixture<DownloadSuppliesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DownloadSuppliesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DownloadSuppliesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
