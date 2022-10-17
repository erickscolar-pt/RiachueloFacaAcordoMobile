import { Component, HostListener, OnInit } from '@angular/core';
import { DashboardService } from '../../providers/dashboard.service';
import { formatDate } from '@angular/common';
import { ExcelService } from 'src/app/shared/providers/excel/excel.service';
import { LoadingService } from 'src/app/shared/providers/loading/loading.service';
import { DealByUser } from 'src/app/shared/providers/user/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public chartPayment = [];
  public chartPromoteCode = [];
  public totalPayment = 0;
  public totalPromoteCode = 0;
  public dealChartByRange = [];
  public excelReport = [];
  public dealChartPromoteCodeByRange = [];
  public dealChartByRangeOpt = {
    isStacked: true,
    width: '100%',
    height: '100%',
    is3D: true,
    vAxis: { minValue: 0 },
    legend: { position: 'top', maxLines: 3 },
    bar: { groupWidth: '75%' },
    colors: ['#7511a9', '#50ebe6', '#000']
  };
  public pieOptions = {
    pieHole: 0.4,
    legend: { position: 'labeled'},
    width: '100%',
    height: '100%',
    chartArea: {width: '100%', height: '100%'}
  };
  public dealChartByRangeColumnNames = [
    'Tipo de pagamento',
    'Boleto',
    'Cartão de crédito aprovado',
    'Cartão de crédito reprovado'
  ];

  public response: any[];
  public response2: any[];


  constructor(
    private dashboardService: DashboardService,
    private excel: ExcelService,
    private loading: LoadingService,
  ) { }

  ngOnInit() {
    this.loading.acessoClient("Tela ADMIN - Relatorio",localStorage.getItem('cpf')).subscribe();

    this.dashboardService.getDeals()
      .subscribe((data: any[]) => {
        this.response = data;
        this.makeChart(data);
      });

    this.dashboardService.getDealbyRange()
      .subscribe(res => {
        this.response2 = res;
        this.dealChart(res);
      });
  }

  // No codigo abaixo recebemos as informações depois mandamos os parametros para a URL do dashboard.service
  public search(searchParameters: any) {
    this.loading.setLoad();
    this.dashboardService.getDealbyRange(searchParameters.inicio, searchParameters.fim)
      .subscribe(res => {
        this.response2 = res;
        this.dealChart(res);
      });
    this.dashboardService.getDeals(searchParameters.inicio, searchParameters.fim)
    .subscribe((data: any[]) => {
      this.response = data;
      this.makeChart(data);
    });
  }

  public makeChart(dealChart: any[]) {
    this.chartPromoteCode = [];
    this.chartPayment = [];
    this.totalPayment = 0;
    this.totalPromoteCode = 0;
    dealChart.map(chart => {
      this.chartPayment.push([chart.PAGAMENTO, chart.QUANTIDADE]);
      this.totalPayment += chart.QUANTIDADE;
      this.totalPromoteCode += chart.PROMOCIONAL;
    });

    this.chartPromoteCode.push(['promocional', this.totalPromoteCode]);
    this.chartPromoteCode.push(['Sem código promocional', this.totalPayment - this.totalPromoteCode]);
  }

  public dealChart(res: any) {
    this.dealChartByRange = [];
    const columnList = this.orderList(res);
    const dates = this.orderDates(res);
    dates.map((data, idx) => {
      let cc = columnList[idx].filter(val => val.pagamento === 'CARD_1')[0];
      cc = cc !== undefined ? cc.quantidade : 0;
      let ticket = columnList[idx].filter(val => val.pagamento === 'TICKET')[0];
      ticket = ticket !== undefined ? ticket.quantidade : 0;
      let ccNot = columnList[idx].filter(val => val.pagamento === 'CARD_0')[0];
      ccNot = ccNot !== undefined ? ccNot.quantidade : 0;
      const date = new Date(data);
      this.dealChartByRange.push([formatDate(date, 'dd/MM/yyyy', 'pt'), ticket, cc, ccNot]);
    });
    this.loading.stopLoad();
  }

  public orderList(res: any) {
    let columns: any[] = Object.values(res);
    columns = columns.sort((a, b) => (a[0].data > b[0].data) ? 1 : ((b[0].data > a[0].data) ? -1 : 0));
    return columns;
  }

  public orderDates(res: any) {
    let dateList = Object.getOwnPropertyNames(res);
    dateList = dateList.map(date => date.substring(0, 10).replace(/-/g, '/'));
    dateList = dateList.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());
    return dateList;
  }

  public generateExcel(datas : any) {
    this.loading.setLoad();
    this.dashboardService.getReportRange(datas.inicio, datas.fim)
      .subscribe((dealList: DealByUser[]) => {
        const report = dealList.map(deal => {
          const valor = deal.value;
          const parcelamento = deal.qttPlots;
          return {
            id: deal.id,
            cpf: deal.userVO.cpfOrCnpj,
            nome: deal.userVO.fullName,
            email: deal.userVO.email,
            idCon: deal.idCon,
            dataAcordo: deal.dtDeal,
            valor,
            parcelamento,
            codigo: deal.comercial,
            dividas: deal.detailsDividaCache,
            contratos: deal.detailsContratoCache
          };
        });
        this.excel.exportAsExcelFile(report, `Relatório Acordos Riachuelo ${formatDate(new Date(), 'dd-MM-yyyy', 'pt')}`);
        this.loading.stopLoad();
      });
  }

  @HostListener('window:resize', ['$event']) // for window scroll events
    public onResize() {
      this.makeChart(this.response)
      this.dealChart(this.response2)
  }

}
