import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntregarComponent } from './entregar.component';

describe('EntregarComponent', () => {
  let component: EntregarComponent;
  let fixture: ComponentFixture<EntregarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntregarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntregarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
