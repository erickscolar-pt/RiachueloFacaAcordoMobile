import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segunda-via',
  templateUrl: './segunda-via.component.html',
  styleUrls: ['./segunda-via.component.scss']
})
export class SegundaViaComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  entrar(){
    this.route.navigate(['/login'])
  }
}
