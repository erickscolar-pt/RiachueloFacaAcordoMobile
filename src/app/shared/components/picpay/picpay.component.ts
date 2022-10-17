import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-picpay',
  templateUrl: './picpay.component.html',
  styleUrls: ['./picpay.component.scss']
})
export class PicPayComponent implements OnInit {

  public contatos : any[];

  constructor(
    public dialogRef: MatDialogRef<PicPayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
  }
  openFacebook(){
    window.open("https://www.blog.facaacordo.com.br/?p=204");
  }
}
