import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargueComponent } from './cargue.component';

describe('CargueComponent', () => {
  let component: CargueComponent;
  let fixture: ComponentFixture<CargueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
