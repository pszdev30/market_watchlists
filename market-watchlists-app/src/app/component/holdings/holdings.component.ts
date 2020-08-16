import { TransferService } from './../../service/transfer.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Ticker } from 'src/app/objects/ticker';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss']
})
export class HoldingsComponent implements OnInit {
  ticker: string;
  results: any[] = [];
  holdings: string[] = []

  constructor(private api: ApiService, private db: AngularFireDatabase, private transferService: TransferService) { }

  ngOnInit() {
    this.transferService.refreshHoldingsClickedObservable$.subscribe(() => {
      this.holdings = []
      this.db.database.ref('/Holdings').once('value').then((resp) => {
        for (const key in resp.val())
          this.holdings.push(resp.val()[key])
        // console.log(this.holdings)
        this.triggerGetHoldings();
      });
    });


    this.transferService.getHoldingsObservable$.subscribe(() => {
      this.results = []
      for (var ticker of this.holdings) {
        this.api.getHoldings(ticker).subscribe((quote: any) => {
          // console.log(quote)
          let ticker: Ticker = new Ticker();
          ticker.name = quote.symbol;
          ticker.lastPrice = quote.latestPrice;
          ticker.change = quote.change;
          ticker.percentChange = quote.changePercent;

          if (ticker.change > 0) ticker.positive = true
          else ticker.positive = false;

          this.results.push(ticker)
        });
      }
    });
  }


  triggerGetHoldings() {
    this.transferService.triggerGetHoldings(true);
  }

  addToHoldings(ticker: string) {
    this.db.database.ref('/Holdings').child(ticker).set(ticker)
    this.triggerRefresh();
  }

  removeFromHoldings(ticker: string) {
    this.db.database.ref('/Holdings').child(ticker).remove()
    this.triggerRefresh();
  }

  removeAllHoldings() {
    for (var holding of this.holdings)
      this.db.database.ref('/Holdings').child(holding).remove()
    this.triggerRefresh();
  }

  triggerRefresh() {
    this.transferService.triggerHoldingsRefresh(true)
  }

  setTicker($event: any) {
    this.ticker = $event;
  }

  resetModal() {
    this.ticker = '';
  }

  reset() {
    this.holdings = []
    this.results = [];
  }


  resetAddToHoldingsModal() {
    this.ticker = '';
    // this.type = '';
    // this.numOfSharesContracts = '';
  }

}
