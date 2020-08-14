import { TransferService } from './../../service/transfer.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Ticker } from 'src/app/objects/ticker';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss']
})
export class HoldingsComponent implements OnInit {

  ticker: string = '';
  type: string = '';
  numOfSharesContracts: string = '';
  firstCount: number = 0;
  newArr: any = [];
  ngForArr: any = [];
  results: any[] = [];
  holdingsArr: string[] = ['IBM']
  buttonClicked: boolean = false;
  toxic: any[] = [];
  tracker: number = 0;
  done: boolean;


  constructor(private api: ApiService, private db: AngularFireDatabase, private transferService: TransferService) { }

  ngOnInit() {
    this.transferService.refreshClickedObservable$.subscribe(() => {
      this.db.list('/Holdings').valueChanges().subscribe((holdings: any) => {
        this.holdingsArr = []
        this.done = false;
        for (let i = 0; i < holdings.length; i++)
          this.holdingsArr.push(holdings[i])
        this.triggerGetHoldings();
      })
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

  // addToHoldingsArr(ticker: string) {
  //   this.holdingsArr.push(ticker)
  // }

  // deleteFromHoldingsArr(ticker: string) {
  //   this.holdingsArr = this.holdingsArr.filter(item => item !== ticker);
  //   console.log(this.holdingsArr)
  // }

  triggerRefresh() {
    this.transferService.triggerRefresh(true)
  }

  getHoldings() {
    // if (this.tracker == 0) {
      this.triggerRefresh()
    //   this.tracker++;
    // }

    this.transferService.getHoldingsObservable$.subscribe(() => {
      this.reset();
      let i = 0;
      for (var ticker of this.holdingsArr) {
        this.api.getHoldingsList(ticker).subscribe((quote) => {
          console.log(quote)
          let ticker: Ticker = new Ticker();
          ticker.name = quote['Global Quote']['01. symbol'];
          ticker.lastPrice = Number(quote['Global Quote']['05. price']);
          ticker.change = Number(quote['Global Quote']['09. change'])
          ticker.numChange = Number(quote['Global Quote']['09. change'])

          if (ticker.numChange > 0) ticker.positive = true
          else ticker.positive = false;

          ticker.percentChange = quote['Global Quote']['10. change percent']

          this.results.push(ticker)
        });
        this.ngForArr.push(i++)
      }
    })



  }

  setTicker($event: any) {
    this.ticker = $event;
    console.log(this.ticker)
  }

  resetModal() {
    this.ticker = '';
  }


  private reset() {
    this.results = [];
    this.ngForArr = [];
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
    // this.tickerElem.nativeElement.value = '';
    // this.typeElem.nativeElement.value = '';
    // this.sharesContractsElem.nativeElement.value = '';
    this.ticker = '';
    this.type = '';
    this.numOfSharesContracts = '';
  }

}
