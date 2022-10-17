import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-termos',
  templateUrl: './termos.component.html',
  styleUrls: ['./termos.component.scss']
})
export class TermosComponent implements OnInit {

  public contatos : any[];

  constructor(
    public dialogRef: MatDialogRef<TermosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    this.contatos = [
      {
        tipo: "Site institucional",
        url: "mailto:contato@atmatec.com.br",
        nome: "contato@atmatec.com.br"
      },
      {
        tipo: "Portal ATMA.Digital",
        url: "mailto:contato@atmatec.com.br",
        nome: "contato@atmatec.com.br"
      },
      {
        tipo: "Portal Faça Acordo",
        url: "mailto:contato@facaacordo.com.br",
        nome: "contato@facaacordo.com.br"
      }
    ]
  }

}
