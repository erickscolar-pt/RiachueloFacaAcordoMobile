import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TermosComponent } from 'src/app/shared/components/termos/termos.component';

@Component({
  selector: 'app-snack-bar',
  templateUrl: './snack-bar.component.html',
  styleUrls: ['./snack-bar.component.scss']
})
export class SnackBarComponent implements OnInit {

  constructor(
    public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  public accept(){
      localStorage.setItem('typeScriptCookie', "accept");
  }
  public notCookie() : boolean{
    return localStorage.getItem('typeScriptCookie') == null ? true : false;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(TermosComponent, {
      width: '65%',
      data: null
    });

    dialogRef.afterClosed().subscribe(result => {
     // //console.log(result);
    });
  }
}
