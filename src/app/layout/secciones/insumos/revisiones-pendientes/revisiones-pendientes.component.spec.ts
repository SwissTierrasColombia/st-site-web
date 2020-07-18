import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionesPendientesComponent } from './revisiones-pendientes.component';

describe('RevisionesPendientesComponent', () => {
  let component: RevisionesPendientesComponent;
  let fixture: ComponentFixture<RevisionesPendientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionesPendientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionesPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
