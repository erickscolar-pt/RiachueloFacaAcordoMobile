import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp1',
  templateUrl: './whatsapp1.component.html',
  styleUrls: ['./whatsapp1.component.scss']
})
export class Whatsapp1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chamar(){
    window.open("https://api.whatsapp.com/send?phone=5511963610672&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")
  }
}
