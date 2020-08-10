import { Ticker } from './objects/ticker';
import { FlaskService } from './service/flask.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  // @ViewChild('ticker') tickerElem: ElementRef;
  // @ViewChild('type') typeElem: ElementRef;
  // @ViewChild('sharesContracts') sharesContractsElem: ElementRef;

  title = 'market-watchlists-app';
  ticker: string = '';
  type: string = '';
  numOfSharesContracts: string = '';
  firstCount: number = 0;
  newArr: any = [];
  ngForArr: any = [];
  results: any[] = [];
  holdingsArr: string[] = ['LYFT']
  buttonClicked: boolean = false;
  pos: boolean;

  constructor(private flaskService: FlaskService) { }

  ngOnInit() {
    // this.getHoldingsList()
    // let mySub: Subscription;
    // mySub = interval(15000).subscribe((func => {
    //   this.ngForArr = []
    //   for (var ticker of this.holdingsArr) {
    //     this.ngForArr = []
    //     this.flaskService.getTicker(ticker).then((quote) => {
    //       let ticker: Ticker = new Ticker();
    //       ticker.name = quote['Global Quote']['01. symbol'];
    //       ticker.lastPrice = quote['Global Quote']['05. price'];
    //       ticker.change = quote['Global Quote']['09. change']
    //       ticker.percentChange = quote['Global Quote']['10. change percent']
    //       this.results.push(ticker)
    //       for (let i = 0; i < this.results.length; i++)
    //         this.ngForArr.push(i)
    //     });
    //   };

    // }));
    // console.log(this.results);

  }

  addToHoldingsArr(ticker: string) {
    this.holdingsArr.push(ticker)
  }

  getHoldingsList() {
    this.reset();
    let i = 0;
    for (var ticker of this.holdingsArr) {
      this.flaskService.getHoldingsList(ticker).subscribe((quote) => {
        console.log(quote)
        let ticker: Ticker = new Ticker();
        ticker.name = quote['Global Quote']['01. symbol'];
        ticker.lastPrice = quote['Global Quote']['05. price'];
        ticker.change = quote['Global Quote']['09. change']
        ticker.numChange = Number(quote['Global Quote']['09. change'])

        if (ticker.numChange > 0) ticker.positive = true
        else ticker.positive = false;

        ticker.percentChange = quote['Global Quote']['10. change percent']

        this.results.push(ticker)
      });
      this.ngForArr.push(i++)
    }
  }


  private reset() {
    this.results = [];
    this.ngForArr = [];
    this.buttonClicked = false;
  }

  // fetchStock(ticker: string) {
  //   let mySub: Subscription;
  //   for (let i = 0; i < this.tempArr.length; i++) {
  //     mySub = interval(10000).subscribe((func => {
  //       this.flaskService.fetchStock(this.tempArr[i]).subscribe((resp) => {
  //         console.log(resp[1])
  //       })
  //     }))
  //   }
  // }

  // test() {
  //   this.newArr = []
  //   for (let i = 0; i < this.tempArr.length; i++) {
  //     this.flaskService.fetchStock(this.tempArr[i]).then((resp: any) => {
  //       console.log(resp);
  //       for (let k = 0; k < resp.length; k++) {
  //         this.newArr.push(resp[k])
  //         this.ngForArr.push(k)
  //       }
  //       console.log(this.newArr)
  //     })
  //   }
  // }

  // initiateTimeOut(i) {
  //   setTimeout(function () { this.test(i) }, 30);
  // }

  // test(i: number) {
  //   this.newArr = [];
  //   if (i >= 0) {
  //     const promise = new Promise(async (resolve, reject) => { await resolve(this.flaskService.fetchStock(this.tempArr[i])) });
  //     setTimeout(async () => {
  //       i--;
  //       await this.test(i)
  //     }, 25000)

  //     Promise.all([promise]).then((values) => {
  //       console.log(values);
  //     });
  //   }
  //   // const promise2 = new Promise((resolve, reject) => { resolve(this.flaskService.fetchStock('NFLX')) });
  // }




  setTicker(ticker: string) {
    this.ticker = ticker;
  }

  setType(type: string) {
    this.type = type;
  }

  setNumOfSharesContracts(num: string) {
    this.numOfSharesContracts = num;
  }

  resetAddToHoldingsModal() {
    // this.tickerElem.nativeElement.value = '';
    // this.typeElem.nativeElement.value = '';
    // this.sharesContractsElem.nativeElement.value = '';
    this.ticker = '';
    this.type = '';
    this.numOfSharesContracts = '';
  }

}
