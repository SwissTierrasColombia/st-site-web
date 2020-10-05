import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceActiveComponent } from './workspace-active.component';

describe('WorkspaceActiveComponent', () => {
  let component: WorkspaceActiveComponent;
  let fixture: ComponentFixture<WorkspaceActiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkspaceActiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceActiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
