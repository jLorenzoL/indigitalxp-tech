import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    constructor(
        private _httpClient: HttpClient) { }

    searchCustomer(document : string, email: string): Observable<any>{
        let params = new HttpParams();
        params = params.append('document', document);
        params = params.append('email', email);
        return this._httpClient.get('http://localhost:8080/search', {params: params});
    }

    saveNewCustomer(data: any): Observable<any>{
        return this._httpClient.post('http://localhost:8080/saveCustomer', data);
    }

    searchCustomerByMonth(): Observable<any> {
        return this._httpClient.get('http://localhost:8080/getInfoByMonth');
    }

    searchCustomerByYYYY(): Observable<any> {
        return this._httpClient.get('http://localhost:8080/getInfoByYear');
    }
}