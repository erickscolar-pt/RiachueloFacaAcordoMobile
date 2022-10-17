import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PicPayComponent } from './picpay.component';

describe('PicPayComponent', () => {
  let component: PicPayComponent;
  let fixture: ComponentFixture<PicPayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PicPayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PicPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
