import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Whatsapp2Component } from './whatsapp2.component';

describe('Whatsapp2Component', () => {
  let component: Whatsapp2Component;
  let fixture: ComponentFixture<Whatsapp2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Whatsapp2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Whatsapp2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
