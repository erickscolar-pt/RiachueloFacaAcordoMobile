import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {HttpClient, HttpParams, HttpErrorResponse} from '@angular/common/http';
import {Observable, throwError, forkJoin, of} from 'rxjs';
import {Company, CompanyDebt, Info, TradingRequest, UserDebtData} from './debt';
import {formatDate} from '@angular/common';
import {TradingOption} from './trading-option';
import {DealTicket} from 'src/app/shared/models/deal';
import {catchError} from 'rxjs/operators';
import {SuggestionDTO} from 'src/app/shared/models/suggestion';
import Swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private baseurl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  public getLocalStorage(){
    const lsDebt = localStorage.setItem('Objeto1', JSON.stringify(this.getDebt))
    //console.log(lsDebt);
  }

  public getDebt(): Observable<UserDebtData> {
    let params = new HttpParams();
    params = params.append('idCompany', "12")
    return this.http.get<any>(`${this.baseurl}debt/get`, {params});
  }

  public getAllDebtValues(request : TradingRequest): Observable<any> {
    return this.http.post<any>(`${this.baseurl}tradingOptions`, request).pipe(
      catchError(err => of({isError: true, error: err}))
    );
  }

  public getDebtOptions(idCon: number, idServ: number, idCompany: number, paymentMethod: string, promoteCod: string, withDiscount: boolean, withoutDiscount: boolean): Observable<TradingOption[][]> {
    let params = new HttpParams();
    params = params.append('idCompany', idCompany.toString());
    params = params.append('paymentMethods', paymentMethod);
    params = params.append('idsConsServs', idCon.toString() + '-' + idServ.toString());

    params = params.append('withDiscount', withDiscount ? "1" : "0");
    params = params.append('withoutDiscount', withoutDiscount ? "1" : "0");

    if (promoteCod) {
      params = params.append('promoteCod', promoteCod);
    }
    params = params.append('vencPrimParcela', formatDate(new Date(), 'yyyy-MM-dd', 'pt'));

    return this.http.get<any>(`${this.baseurl}tradingOptions`, {params}).pipe(
      catchError(err => of({isError: true, error: err}))
    );
  }

  public postName(name: string) {
    sessionStorage.setItem('name', name);
  }

  public getName() {
    return sessionStorage.getItem('name');
  }

  public getTicket(idBoleto: number, idCon: number, dataPagamento: string): Observable<DealTicket> {
    let params = new HttpParams();
    params = params.append('idCon', idCon.toString());
    params = params.append('dataPagamento', dataPagamento);
    params = params.append('idBoleto', idBoleto.toString());

    return this.http.get<DealTicket>(`${this.baseurl}ticket`, {params});
  }

  public postSendMail(idCon: number, email?: string, idCompany?: number, url?: string): Observable<any> {
    const dto = {email, idCon, idCompany, url};
    return this.http.post<any>(`${this.baseurl}ticket/sendEmail`, dto);
  }

  public postSendSMS(idCon: number, telefone?: string, idCompany?: number): Observable<any> {
    const dto = {telefone, idCon, idCompany};
    return this.http.post<any>(`${this.baseurl}ticket/sendSms`, dto);
  }

  public postSendAgendamento(idCon: number, dataAndamento: string, idEmpresa: number, parcelaNum: number , valorEntrada: number, valorDemais: number, tipoNegociacao: string){
    return this.http.post<any>(`${this.baseurl}deal/insereAdamento?idCon=${idCon}&dataAndamento=${dataAndamento}&idEmpresa=${idEmpresa}&parcelaNum=${parcelaNum}&valorEntrada=${valorEntrada}&valorDemais=${valorDemais}&tipoNegociacao=${tipoNegociacao}`,{});
  }

  public postPontuacao(valorParcela: Number, idEmpresa: Number): Observable<any> {
    return this.http.post<any>(`${this.baseurl}deal/pontuacao?valorParcela=${valorParcela}&idEmpresa=${idEmpresa}`,null);
  }

  public checkPromoCode(code: string) {
    return this.http.get<any>(`${this.baseurl}promoteCod/check/${code}`);
  }

  public postSuggestion(suggestion: SuggestionDTO) {
    return this.http.post<any>(`${this.baseurl}form/newDebtForm`, suggestion);
  }

  private static handleError(error: HttpErrorResponse) {
    switch (error.status) {
      case 400:
        return throwError(404);

      default:
        return throwError('Por favor tente mais tarde...');
    }
  }
}
