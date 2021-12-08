import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowFieldInfoComponent } from './show-field-info.component';

describe('ShowFieldInfoComponent', () => {
  let component: ShowFieldInfoComponent;
  let fixture: ComponentFixture<ShowFieldInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowFieldInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowFieldInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
