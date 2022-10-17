import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotFoundOptionComponent } from './not-found-option.component';

describe('NotFoundOptionComponent', () => {
  let component: NotFoundOptionComponent;
  let fixture: ComponentFixture<NotFoundOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
