import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICustomer, ITransaction } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = "http://localhost:3000/";

  constructor(private _HttpClient: HttpClient) { }

  getCustomers(): Observable<ICustomer[]> {
    return this._HttpClient.get<ICustomer[]>(`${this.baseUrl}customers`);
  }
  getTransactions(): Observable<ITransaction[]> {
    return this._HttpClient.get<ITransaction[]>(`${this.baseUrl}transactions`);
  }
  getCustomerById(id: ICustomer["id"]): Observable<ICustomer> {
    return this._HttpClient.get<ICustomer>(`${this.baseUrl}customers/${id}`);
  }
  getTransactionsForCustomer(customer_id: ICustomer["id"]): Observable<ITransaction[]> {
    return this._HttpClient.get<ITransaction[]>(`${this.baseUrl}transactions`, { params: { customer_id } });
  }
}
