import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  refreshClickedSubject: Subject<Boolean> = new Subject<Boolean>();
  refreshClickedObservable$: Observable<any> = this.refreshClickedSubject.asObservable();

  getHoldingsSubject: Subject<Boolean> = new Subject<Boolean>();
  getHoldingsObservable$: Observable<any> = this.getHoldingsSubject.asObservable();


  constructor() { }

  triggerGetHoldings(trigger: boolean) {
    this.getHoldingsSubject.next(trigger);
  }

  triggerRefresh(trigger: boolean) {
    this.refreshClickedSubject.next(trigger);
  }

}
