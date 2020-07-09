import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IntegrationsPossiblesComponent } from './integrations-possibles.component';

describe('IntegrationsPossiblesComponent', () => {
  let component: IntegrationsPossiblesComponent;
  let fixture: ComponentFixture<IntegrationsPossiblesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IntegrationsPossiblesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IntegrationsPossiblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
