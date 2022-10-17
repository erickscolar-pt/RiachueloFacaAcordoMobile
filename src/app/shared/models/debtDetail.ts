export interface Plot {
  numero: string;
  valorEntrada: number;
  valorDemaisParcelas?: any;
  dataVencimento: Date;
}

export interface DebtDetail {
  debtDetail?: DebtDetails[] | any;
}

export interface DebtDetails {
  idCon: number;
  idServ: number;
  trackCod: string;
  plots: Plot[];
}
