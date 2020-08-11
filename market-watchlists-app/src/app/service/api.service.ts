import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // fetchStockUrl: string = 'fetch_stock/';

  constructor(private http: HttpClient) { }

  // fetchStock(ticker: any) {
  //   return this.http.get(environment.baseUrl + this.fetchStockUrl + ticker).toPromise();
  // }

  getHoldingsList(ticker: any) {
    return this.http.get(environment.baseUrl + ticker + '&apikey=' + environment.apiKey)
  }

}
