import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtPaymentTicketComponent } from './debt-payment-ticket.component';

describe('DebtPaymentTicketComponent', () => {
  let component: DebtPaymentTicketComponent;
  let fixture: ComponentFixture<DebtPaymentTicketComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtPaymentTicketComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtPaymentTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
