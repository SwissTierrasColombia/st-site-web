import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorComponent } from './operador.component';

describe('OperadorComponent', () => {
  let component: OperadorComponent;
  let fixture: ComponentFixture<OperadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
