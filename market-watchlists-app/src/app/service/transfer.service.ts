import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransferService {
  refreshHoldingsClickedSubject: Subject<Boolean> = new Subject<Boolean>();
  refreshHoldingsClickedObservable$: Observable<any> = this.refreshHoldingsClickedSubject.asObservable();

  getHoldingsSubject: Subject<Boolean> = new Subject<Boolean>();
  getHoldingsObservable$: Observable<Boolean> = this.getHoldingsSubject.asObservable();

  refreshPotentialHoldingsClickedSubject: Subject<Boolean> = new Subject<Boolean>();
  refreshPotentialHoldingsClickedObservable$: Observable<Boolean> = this.refreshPotentialHoldingsClickedSubject.asObservable();

  getPotentialHoldingsSubject: Subject<Boolean> = new Subject<Boolean>();
  getPotentialHoldingsObservable$: Observable<Boolean> = this.getPotentialHoldingsSubject.asObservable();

  refreshRandomClickedSubject: Subject<Boolean> = new Subject<Boolean>();
  refreshRandomClickedObservable$: Observable<Boolean> = this.refreshRandomClickedSubject.asObservable();

  getRandomSubject: Subject<Boolean> = new Subject<Boolean>();
  getRandomObservable$: Observable<Boolean> = this.getRandomSubject.asObservable();

  cancelRefreshSubject: Subject<Boolean> = new Subject<Boolean>();
  cancelRefreshObservable$: Observable<Boolean> = this.cancelRefreshSubject.asObservable();

  earnings: Subject<Boolean> = new Subject<Boolean>();
  earningsObservable$: Observable<Boolean> = this.earnings.asObservable();

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

  triggerGetRandom(trigger: boolean) {
    this.getRandomSubject.next(trigger);
  }

  triggerRandomRefresh(trigger: boolean) {
    this.refreshRandomClickedSubject.next(trigger);
  }

  stopRefresh(trigger: boolean) {
    this.cancelRefreshSubject.next(trigger);
  }

  goToEarnings(trigger: boolean) {
    this.earnings.next(trigger);
  }

}   
