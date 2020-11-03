import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorAssignmentComponent } from './operator-assignment.component';

describe('OperatorAssignmentComponent', () => {
  let component: OperatorAssignmentComponent;
  let fixture: ComponentFixture<OperatorAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OperatorAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OperatorAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
