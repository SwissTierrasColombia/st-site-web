import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregasAtendidasComponent } from './entregas-atendidas.component';

describe('EntregasAtendidasComponent', () => {
  let component: EntregasAtendidasComponent;
  let fixture: ComponentFixture<EntregasAtendidasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregasAtendidasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregasAtendidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
