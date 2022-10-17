import { Injectable } from "@angular/core";
import { Title } from "@angular/platform-browser";

//let abaTitulo: string;
//declare let abaTitulo: "Pague Comprando 1";
//declare let ga: any;


@Injectable({
  providedIn: 'root'
})
export class Tools {
  public abaTitulo = 'Riachuelo';

  public constructor(private titulo: Title) { }

  public setTitle(novoTitulo: string) {
    if(novoTitulo == undefined){
      this.titulo.setTitle(this.abaTitulo);
    }else{
      this.titulo.setTitle(this.abaTitulo + " - " + novoTitulo);
    }
  }

  public currentYearLong(): number {
    return new Date().getFullYear();
  }
}

