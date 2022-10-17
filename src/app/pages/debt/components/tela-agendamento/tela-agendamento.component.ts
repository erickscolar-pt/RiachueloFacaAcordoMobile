import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tools } from 'src/app/shared/tools';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';

@Component({
  selector: 'app-tela-agendamento',
  templateUrl: './tela-agendamento.component.html',
  styleUrls: ['./tela-agendamento.component.scss']
})
export class TelaAgendamentoComponent implements OnInit {
  data: string;
  nameRota: any;

  constructor(
    private tools:Tools,
    private router: Router,
    private loading: LoadingService,
  ) { }

  ngOnInit() {
    this.loading.acessoClient("Agendamento",localStorage.getItem('cpf')).subscribe();


    if(this.router.url == '/debt/agendamento'){
      this.nameRota = "Negociação Agendada Riachuelo"
    }
    this.tools.setTitle(this.nameRota);

    this.data = localStorage.getItem('VencimentoPromessaPagamento')

  }

}
