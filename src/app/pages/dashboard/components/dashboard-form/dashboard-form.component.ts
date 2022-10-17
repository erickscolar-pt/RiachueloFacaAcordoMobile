import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { formatDate } from '@angular/common';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';


@Component({
  selector: 'app-dashboard-form',
  templateUrl: './dashboard-form.component.html',
  styleUrls: ['./dashboard-form.component.scss']
})
export class DashboardFormComponent implements OnInit {
  public dashForm: FormGroup;
  @Output() public dashSearch = new EventEmitter();
  @Output() public generateXlsx = new EventEmitter();
  public inicio;
  public fim;

  constructor(
    private fb: FormBuilder,
    private loading: LoadingService,

  ) { }

  ngOnInit() {
    this.loading.acessoClient("Tela ADMIN - Relatorio",localStorage.getItem('cpf')).subscribe();

    this.dashForm = this.fb.group({
      date: new FormControl('', []),
    });
  }

  public generateReport() {
    const date = this.dashForm.get('date').value;
    let inicio;
    let fim;
    if (date && date.begin) {
      inicio = formatDate(date.begin, 'yyyy-MM-dd', 'pt');
    }
    if (date && date.end) {
      fim = formatDate(date.end, 'yyyy-MM-dd', 'pt');
    }
    this.generateXlsx.emit({inicio, fim});
  }

  public onSubmit(num: number) {
    const date = this.dashForm.get('date').value;
    let inicio;
    let fim;
    if (date && date.begin) {
      inicio = formatDate(date.begin, 'yyyy-MM-dd', 'pt');
    }
    if (date && date.end) {
      fim = formatDate(date.end, 'yyyy-MM-dd', 'pt');
    }
    if (this.dashForm.valid) {
      if(num == 1){
        this.dashSearch.emit({inicio, fim})
      } else {
        this.generateXlsx.emit({inicio, fim})
      }
    }
  }

}
