export interface DealDTO {
    cep?: string;
    clientKey?: string;
    idCompany?: number;
    idCon?: number;
    idServ?: number;
    numero?: string;
    paymentMethod?: string;
    qtPlots?: number;
    trackCode?: string;
    promoteCod?: string;
    url?: string;
}

export interface DealTicket {
    codigoBarras: string;
    linhaDigitavel: string;
    pdfBase64: string;
    fileName: string;
    linkBoleto: any;
}

export interface IuguCCTransaction {
    message: string;
    success: boolean;
    url: string;
    pdf: string;
    invoiceId: string;
    lr: string;
}
