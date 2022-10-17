import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paguecomprando',
  templateUrl: './paguecomprando.component.html',
  styleUrls: ['./paguecomprando.component.scss']
})
export class PaguecomprandoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public loja(){
    window.open("https://paguecomprando.com.br/");
  }

}
