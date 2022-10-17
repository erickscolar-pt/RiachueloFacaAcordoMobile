import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-whatsapp3',
  templateUrl: './whatsapp3.component.html',
  styleUrls: ['./whatsapp3.component.scss']
})
export class Whatsapp3Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  chamar(){
    window.open("https://api.whatsapp.com/send?phone=5511964392624&text=Ol%C3%A1%2C%20gostaria%20de%20um%20contato")
  }

}
