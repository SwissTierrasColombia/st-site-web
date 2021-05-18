import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionesProveedorComponent } from './peticiones-proveedor.component';

describe('PeticionesProveedorComponent', () => {
  let component: PeticionesProveedorComponent;
  let fixture: ComponentFixture<PeticionesProveedorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionesProveedorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionesProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
