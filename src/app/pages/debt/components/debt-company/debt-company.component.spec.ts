import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebtCompanyComponent} from './debt-company.component';

describe('DebtCompanyComponent', () => {
  let component: DebtCompanyComponent;
  let fixture: ComponentFixture<DebtCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebtCompanyComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
