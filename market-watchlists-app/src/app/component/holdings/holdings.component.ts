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
  ticker: string = '';
  firstCount: number = 0;
  results: any[] = [];
  holdingsArr: string[] = ['IBM']
  buttonClicked: boolean = false;

  constructor(private api: ApiService, private db: AngularFireDatabase, private transferService: TransferService) { }

  ngOnInit() {
    this.transferService.refreshClickedObservable$.subscribe(() => {
      this.db.list('/Holdings').valueChanges().subscribe((holdings: any) => {
        this.holdingsArr = []
        for (let i = 0; i < holdings.length; i++)
          this.holdingsArr.push(holdings[i])
        this.triggerGetHoldings();
      })
    })


    this.transferService.getHoldingsObservable$.subscribe(() => {
      this.results = []
      for (var ticker of this.holdingsArr) {
        this.api.getHoldings(ticker).subscribe((quote: any) => {
          console.log(quote)
          let ticker: Ticker = new Ticker();
          ticker.name = quote.symbol;
          ticker.lastPrice = quote.latestPrice;
          ticker.change = quote.change;
          ticker.percentChange = quote.changePercent;

          if (ticker.change > 0) ticker.positive = true
          else ticker.positive = false;

          this.results.push(ticker)
        });
        // this.ngForArr.push(i++)
      }
    })
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

  triggerRefresh() {
    this.transferService.triggerRefresh(true)
  }

  // getHoldings() {
  //   this.triggerRefresh()
  //   this.reset();


  // }

  setTicker($event: any) {
    this.ticker = $event;
    console.log(this.ticker)
  }

  resetModal() {
    this.ticker = '';
  }


  private reset() {
    this.holdingsArr = []
    this.results = [];
    // this.ngForArr = [];
    this.buttonClicked = false;
  }

  // setTicker(ticker: string) {
  //   this.ticker = ticker;
  // }

  // setType(type: string) {
  //   this.type = type;
  // }

  // setNumOfSharesContracts(num: string) {
  //   this.numOfSharesContracts = num;
  // }

  resetAddToHoldingsModal() {
    this.ticker = '';
    // this.type = '';
    // this.numOfSharesContracts = '';
  }

}
