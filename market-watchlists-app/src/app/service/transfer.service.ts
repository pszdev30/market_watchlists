import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  refreshHoldingsClickedSubject: Subject<Boolean> = new Subject<Boolean>();
  refreshHoldingsClickedObservable$: Observable<any> = this.refreshHoldingsClickedSubject.asObservable();

  getHoldingsSubject: Subject<Boolean> = new Subject<Boolean>();
  getHoldingsObservable$: Observable<any> = this.getHoldingsSubject.asObservable();

  refreshPotentialHoldingsClickedSubject: Subject<Boolean> = new Subject<Boolean>();
  refreshPotentialHoldingsClickedObservable$: Observable<any> = this.refreshPotentialHoldingsClickedSubject.asObservable();

  getPotentialHoldingsSubject: Subject<Boolean> = new Subject<Boolean>();
  getPotentialHoldingsObservable$: Observable<any> = this.getPotentialHoldingsSubject.asObservable();


  constructor() { }

  triggerGetHoldings(trigger: boolean) {
    this.getHoldingsSubject.next(trigger);
  }

  triggerHoldingsRefresh(trigger: boolean) {
    this.refreshHoldingsClickedSubject.next(trigger);
  }

  triggerGetPotentialHoldings(trigger: boolean) {
    this.getPotentialHoldingsSubject.next(trigger);
  }

  triggerPotentialHoldingsRefresh(trigger: boolean) {
    this.refreshPotentialHoldingsClickedSubject.next(trigger);
  }

}
