import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AtendidaComponent } from './atendida.component';

describe('AtendidaComponent', () => {
  let component: AtendidaComponent;
  let fixture: ComponentFixture<AtendidaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AtendidaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AtendidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
