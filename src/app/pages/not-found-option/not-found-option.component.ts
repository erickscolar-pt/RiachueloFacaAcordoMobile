import { Component, OnInit } from '@angular/core';
import { authBg, mobileDefault, homeAlt } from 'src/app/shared/providers/background';

@Component({
  selector: 'app-not-found-option',
  templateUrl: './not-found-option.component.html',
  styleUrls: ['./not-found-option.component.scss']
})
export class NotFoundOptionComponent implements OnInit {
  public bg = authBg;
  public bgMobile = mobileDefault;
  public bgAlt = homeAlt;

  constructor() { }

  ngOnInit() {
  }

}
