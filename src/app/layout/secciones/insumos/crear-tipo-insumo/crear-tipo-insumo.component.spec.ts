import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTipoInsumoComponent } from './crear-tipo-insumo.component';

describe('CrearTipoInsumoComponent', () => {
  let component: CrearTipoInsumoComponent;
  let fixture: ComponentFixture<CrearTipoInsumoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearTipoInsumoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearTipoInsumoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
