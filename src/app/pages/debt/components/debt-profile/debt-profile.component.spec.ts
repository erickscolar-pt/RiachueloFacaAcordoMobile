import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebtProfileComponent} from './debt-profile.component';

describe('DebtProfileComponent', () => {
  let component: DebtProfileComponent;
  let fixture: ComponentFixture<DebtProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebtProfileComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
