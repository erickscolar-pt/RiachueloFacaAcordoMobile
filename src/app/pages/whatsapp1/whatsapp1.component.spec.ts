import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Whatsapp1Component } from './whatsapp1.component';

describe('Whatsapp1Component', () => {
  let component: Whatsapp1Component;
  let fixture: ComponentFixture<Whatsapp1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Whatsapp1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Whatsapp1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
