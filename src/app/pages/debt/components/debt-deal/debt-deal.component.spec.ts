import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DebtDealComponent} from './debt-deal.component';

describe('DebtDealComponent', () => {
  let component: DebtDealComponent;
  let fixture: ComponentFixture<DebtDealComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DebtDealComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtDealComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
