import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspaceRefuseComponent } from './workspace-refuse.component';

describe('WorkspaceRefuseComponent', () => {
  let component: WorkspaceRefuseComponent;
  let fixture: ComponentFixture<WorkspaceRefuseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspaceRefuseComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkspaceRefuseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
