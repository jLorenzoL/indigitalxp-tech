export interface IResponseService{
    state:boolean,
    message:string
  }

export interface ICustomerBusqueda{
    state : string,
    name : string,
    lastname : string,
    mail : string,
    document : string,
    creation : string,
    born : string
}

export interface IResponseBusquedaCustomer extends IResponseService {
    message: string;
    totalElements: number;
    totalPages: number;
    customers: [],
}