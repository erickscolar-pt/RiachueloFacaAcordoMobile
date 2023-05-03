import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp2',
  templateUrl: './whatsapp2.component.html',
  styleUrls: ['./whatsapp2.component.scss']
})
export class Whatsapp2Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chamar(){
    window.open("https://api.whatsapp.com/send?phone=5511963610672&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")
  }
}
