import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { ActivatedRoute } from '@angular/router';
import { Ticker } from 'src/app/objects/ticker';

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
  holdingsArr: string[] = ['LYFT']
  buttonClicked: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit() {
    // this.activatedRoute.data.subscribe(data => console.log(data))
    // this.api.getHoldingsList('MSFT').subscribe(data => this.test = data)

    // let mySub: Subscription;
    // mySub = interval(15000).subscribe((func => {
    //   this.ngForArr = []
    //   for (var ticker of this.holdingsArr) {
    //     this.ngForArr = []
    //     this.apiService.getTicker(ticker).then((quote) => {
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

  deleteFromHoldingsArr(ticker: string) {
    this.holdingsArr = this.holdingsArr.filter(item => item !== ticker);
    console.log(this.holdingsArr)
  }

  getHoldingsList() {
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
  }


  private reset() {
    this.results = [];
    this.ngForArr = [];
    this.buttonClicked = false;
  }

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
