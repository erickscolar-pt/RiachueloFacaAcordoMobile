import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentCreditCardWarningComponent } from './payment-credit-card-warning.component';

describe('PaymentCreditCardWarningComponent', () => {
  let component: PaymentCreditCardWarningComponent;
  let fixture: ComponentFixture<PaymentCreditCardWarningComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaymentCreditCardWarningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentCreditCardWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
