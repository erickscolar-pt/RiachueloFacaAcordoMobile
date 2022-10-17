export class User {
    birth?: string;
    cpfOrCnpj: string;
    email?: string;
    phone?: string;
    fullName?: string;
    password: string;
    url?: string;
}

export class Payment {
    codigoPagamento?: string;
    valorOriginal?: number;
    qtdParcelas?: number;
    cpfOrCnpj?: string;
    nomeCompleto?: string;
    celular?: string;
    email?: string;
    cvv?: string;
    nomeCartao?: string;
    numeroCartao?: string;
    validade?: string;

}

export interface UserVO {
    active: boolean;
    birth?: string;
    cpfOrCnpj?: string;
    dtRegister?: Date;
    email?: string;
    fullName?: string;
    id?: number;
    idNectar?: number;
    lastUpdate?: Date;
    phone?: string;
    profile?: string[];
}

export interface PromoteCod {
    id: number;
    promotedCod: string;
    expiration: Date;
    dtInsert: Date;
    active: boolean;
    user?: any;
}

export interface DealByUser {
    id: number;
    value: number;
    qttPlots: number;
    dtDeal: Date;
    userVO: UserVO;
    idCon: string;
    cardApproved?: boolean;
    promoteCod: PromoteCod;
    typePayment: string;
    comercial?: string;
    detailsDividaCache?: string;
    detailsContratoCache?: string;
}