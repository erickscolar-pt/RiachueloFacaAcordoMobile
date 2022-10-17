export interface Plot {
  numero?: string;
  valorEntrada?: number;
  valorDemaisParcelas?: number;
  dataVencimento?: Date;
  trackCode?: string
}

export interface TradingOption {
  idCon: number;
  idServ: number;
  trackCod: string;
  plots: Plot[];
}
