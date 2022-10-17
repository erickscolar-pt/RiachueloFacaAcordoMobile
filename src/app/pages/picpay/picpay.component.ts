import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-picpay2',
  templateUrl: './picpay.component.html',
  styleUrls: ['./picpay.component.scss']
})
export class PicpayComponent2 implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chamar(){
    window.open("https://www.blog.facaacordo.com.br/?p=204");
  }

}
