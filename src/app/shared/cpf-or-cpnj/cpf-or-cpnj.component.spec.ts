import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfOrCpnjComponent } from './cpf-or-cpnj.component';

describe('CpfOrCpnjComponent', () => {
  let component: CpfOrCpnjComponent;
  let fixture: ComponentFixture<CpfOrCpnjComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CpfOrCpnjComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CpfOrCpnjComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
