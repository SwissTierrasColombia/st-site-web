import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevisionPendienteComponent } from './revision-pendiente.component';

describe('RevisionPendienteComponent', () => {
  let component: RevisionPendienteComponent;
  let fixture: ComponentFixture<RevisionPendienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RevisionPendienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevisionPendienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
