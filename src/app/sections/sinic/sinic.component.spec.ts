import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SinicComponent } from './sinic.component';

describe('SinicComponent', () => {
  let component: SinicComponent;
  let fixture: ComponentFixture<SinicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SinicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SinicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
