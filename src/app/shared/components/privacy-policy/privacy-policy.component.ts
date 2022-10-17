import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-privacy-policy',
  templateUrl: './privacy-policy.component.html',
  styleUrls: ['./privacy-policy.component.scss']
})
export class PrivacyPolicyComponent implements OnInit {

  public contatos : any[];
  public isTermsChecked = false;
  constructor(
    public dialogRef: MatDialogRef<PrivacyPolicyComponent>,
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

  public changeTerms(event) {
    this.isTermsChecked = event.checked;
  }

}
