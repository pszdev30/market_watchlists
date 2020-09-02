import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getHoldings(ticker: any) {
    return this.http.get(environment.IEX_BASE_URL + ticker + '/quote?token=' + environment.IEX_API_TOKEN)
  }

  getPotentialHoldings(ticker: any) {
    return this.http.get(environment.IEX_BASE_URL + ticker + '/quote?token=' + environment.IEX_API_TOKEN)
  }

  getRandom(ticker: any) {
    return this.http.get(environment.IEX_BASE_URL + ticker + '/quote?token=' + environment.IEX_API_TOKEN)
  }

  earnings() {
    return of(4);
    return this.http.get(environment.IEX_BASE_URL + 'market/today-earnings?token=' + environment.IEX_API_TOKEN)
  }

}
