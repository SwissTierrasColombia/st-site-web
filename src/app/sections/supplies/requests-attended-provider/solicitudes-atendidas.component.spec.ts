import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudesAtendidasComponent } from './solicitudes-atendidas.component';

describe('SolicitudesAtendidasComponent', () => {
  let component: SolicitudesAtendidasComponent;
  let fixture: ComponentFixture<SolicitudesAtendidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolicitudesAtendidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitudesAtendidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
