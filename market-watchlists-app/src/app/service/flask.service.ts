import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FlaskService {
  fetchStockUrl: string = 'fetch_stock/';

  constructor(private http: HttpClient) { }

  fetchStock(ticker: string) {
    return this.http.get(environment.baseUrl + this.fetchStockUrl + ticker);
  }

}
