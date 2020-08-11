import { ApiService } from './service/api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable, Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HoldingsResolverService implements Resolve<Object[]> {
  holdingsList: string[] = ['LYFT']


  constructor(private http: HttpClient, private api: ApiService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Object[] | import("rxjs").Observable<Object[]> | Promise<Object[]> {
    const observable = Observable.create(observer => {
      for (var ticker of this.holdingsList)
        observer.next(this.http.get(environment.baseUrl + ticker + '&apikey=' + environment.apiKey))
      observer.complete()
    });
    return observable;
  }
}
