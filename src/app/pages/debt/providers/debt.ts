import { DebtDetail, Plot } from 'src/app/shared/models/debtDetail';
import { NegociationType } from 'src/app/shared/models/negociation-type';
import { PaymentMethod } from 'src/app/shared/models/payment-method.enum';
import { DealTicket } from "../../../shared/models/deal";

export interface Data {
  id: number;
  name: string;
  urlImage: string;
}

export interface Debt {
  idTra: number;
  descricao: string;
  bandeira: string;
  numeroTitulo: string;
  dataVencimento: Date;
  dataDevolucao: Date;
  diasAtraso: number;
  valorOriginal: number;
  valorAtualizado: number;
  informacoesAdicionais: string;
}

export interface Company {
  nomeCliente: string;
  companyDebts: CompanyDebt[];
}

export interface CompanyDebt {
  agrupamento: string;
  nomeFantasia: string;
  bandeira: string;
  contrato: string;
  idCon: number;
  idServ: number;
  informacoes: Info[];
  dividas: Debt[];
  acordo: Deal[];
  company: Data;
  tradingOptions?: TradingDetails[];
  plotSelected?: Plot;
  tradingOptionSelected?: TradingDetails;
  typeNegociation?: NegociationType;
  idTraParcial?: string;
  paymentOption?: PaymentMethod
  ticket?: DealTicket;
  qtdContratos?: number; //usado para determinar se a pessoa vai querer negociar mais uma vez
  jocker?: boolean; //usado para trocar o estado do input property quando o cliente troca a opcao de negociacao (saldo vencer e ou vencido) no debt profile
}

export interface TradingDetails {
  vencimentoPrimeira: any;
  plano?: string;
  codigoFaixa?: string;
  descricaoFaixa?: string;
  parcelasNum?: string;
  vencimentoPrimeiraParcela?: string;
  valorPrimeira?: string;
  valorOriginal?: string;
  valorCorrigido?: string;
  valorNegociar?: string;
  valorDemais?: string;
  parcelas?: Plot[];

}
export interface Info {
  descricao?: string;
  valor?: string;
}

export interface TradingRequest {
  idCompany?: string;
  idCon?: string;
  document?: string;
  titulos?: string;
  saldoMinimo?: string;
}

export interface SaveDealDTO {
  idCompany?: number;
  idCon?: number;
  cep?: string;
  numero?: string;
  clientKey?: string;
  url?: string;
  cpf?: string;
  paymentOption?: string;
  typeNegociation?: string;
  idTraParcial?: string;
  parcela?: Plot;
  dataVencimento?: string;
  listDetails?: SaveDealDetail[];
  listInformacoes?: Info[];
  opcaoNegociacaoNectar?: TradingDetails;
}
export interface DebtPaymentMethods {
  paymentMethod: string;
  valorSemDesconto?: number;
  valorComDesconto?: number;
  dealCodes?: DebtDealCodes[];
}

export interface DebtDealCodes {
  trackCod: string;
  valorSemDesconto?: number;
  valorComDesconto?: number;
  debt?: DebtValue;
}

export interface DebtValue {
  idCon: number;
  idServ: number;
  valorSemDesconto?: number;
  valorComDesconto?: number;
  plots?: Plot[];
  plotsWithDiscount?: Plot[];
}

export interface SelectedDebt {
  selectedDebt?: CompanyDebt;
  code?: string;
  isPayment?: boolean;
  isDeal?: boolean;
  isBankSlip?: boolean;
  bankSlip?: DealTicket;
  isCCPlot?: boolean;
  isCCWithPhotoAlertClicked?: boolean;
  ccPlot?: Plot;
  isTicketPlot?: boolean;
  ticketPlot?: Plot;
  valorAtualizado?: number;
  idCon?: number;
}

export interface UserDebtData {
  nomeCliente: string;
  contratosNectar: CompanyDebt[];
}

export interface AcordoParcela {
  numeroParcela: number;
  dataVencimento: Date;
  valorParcela: number;
  valorPago: number;
  dataPagemento?: any;
  idParcela: number;
  boletoLiberado: string;
}

export interface Deal {
  dataAcordo: Date;
  diasMaximoProjecao: Date;
  acordoParcela: AcordoParcela[];
}

export interface SaveDealDetail {
  divida?: string;
  contrato?: string;
}
