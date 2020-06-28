import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregaAtendidaComponent } from './entrega-atendida.component';

describe('EntregaAtendidaComponent', () => {
  let component: EntregaAtendidaComponent;
  let fixture: ComponentFixture<EntregaAtendidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregaAtendidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregaAtendidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
