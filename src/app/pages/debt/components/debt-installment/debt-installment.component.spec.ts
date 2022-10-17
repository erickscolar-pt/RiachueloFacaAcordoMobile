import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebtInstallmentComponent} from './debt-installment.component';

describe('DebtInstallmentComponent', () => {
  let component: DebtInstallmentComponent;
  let fixture: ComponentFixture<DebtInstallmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebtInstallmentComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtInstallmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
