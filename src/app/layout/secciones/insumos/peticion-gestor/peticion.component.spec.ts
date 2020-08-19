import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeticionComponent } from './peticion.component';

describe('PeticionComponent', () => {
  let component: PeticionComponent;
  let fixture: ComponentFixture<PeticionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeticionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeticionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
