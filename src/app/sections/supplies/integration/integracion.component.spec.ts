import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegracionComponent } from './integracion.component';

describe('IntegracionComponent', () => {
  let component: IntegracionComponent;
  let fixture: ComponentFixture<IntegracionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegracionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegracionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
