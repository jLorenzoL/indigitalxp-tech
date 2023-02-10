import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerRequest } from '../models/consultaRequest';

@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    USER_API_BASE_URL = 'http://localhost:8080/';

    constructor(
        private _httpClient: HttpClient) { }

    searchCustomerPage(searchFilters: CustomerRequest): Observable<any> {
        return this._httpClient.post(`${this.USER_API_BASE_URL}getCustomerList`, searchFilters);
    }

    saveNewCustomer(data: any): Observable<any> {
        return this._httpClient.post(`${this.USER_API_BASE_URL}saveCustomer`, data);
    }

    searchCustomerByMonth(): Observable<any> {
        return this._httpClient.get(`${this.USER_API_BASE_URL}getInfoByMonth`);
    }

    searchCustomerByYYYY(): Observable<any> {
        return this._httpClient.get(`${this.USER_API_BASE_URL}getInfoByYear`);
    }
}