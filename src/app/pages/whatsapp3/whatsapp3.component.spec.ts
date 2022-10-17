import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Whatsapp3Component } from './whatsapp3.component';

describe('Whatsapp3Component', () => {
  let component: Whatsapp3Component;
  let fixture: ComponentFixture<Whatsapp3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Whatsapp3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Whatsapp3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
