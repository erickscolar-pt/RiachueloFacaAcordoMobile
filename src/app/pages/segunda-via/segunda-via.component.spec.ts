import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SegundaViaComponent } from './segunda-via.component';

describe('SegundaViaComponent', () => {
  let component: SegundaViaComponent;
  let fixture: ComponentFixture<SegundaViaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SegundaViaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundaViaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
