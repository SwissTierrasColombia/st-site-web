import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchWorkspaceComponent } from './search-workspace.component';

describe('SearchWorkspaceComponent', () => {
  let component: SearchWorkspaceComponent;
  let fixture: ComponentFixture<SearchWorkspaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
