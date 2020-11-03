import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorComponent } from './gestor.component';

describe('GestorComponent', () => {
  let component: GestorComponent;
  let fixture: ComponentFixture<GestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
