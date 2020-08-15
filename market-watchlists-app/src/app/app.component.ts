import { TransferService } from './service/transfer.service';
import { Ticker } from './objects/ticker';
import { ApiService } from './service/api.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
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

  constructor(private api: ApiService, private transferService: TransferService) { }

  ngOnInit() {}

  ngAfterViewInit() {
    this.transferService.triggerHoldingsRefresh(true);
    this.transferService.triggerPotentialHoldingsRefresh(true);
    this.transferService.triggerRandomRefresh(true);
  }

  // fetchStock(ticker: string) {
  //   let mySub: Subscription;
  //   for (let i = 0; i < this.tempArr.length; i++) {
  //     mySub = interval(10000).subscribe((func => {
  //       this.apiService.fetchStock(this.tempArr[i]).subscribe((resp) => {
  //         console.log(resp[1])
  //       })
  //     }))
  //   }
  // }

  // test() {
  //   this.newArr = []
  //   for (let i = 0; i < this.tempArr.length; i++) {
  //     this.apiService.fetchStock(this.tempArr[i]).then((resp: any) => {
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
  //     const promise = new Promise(async (resolve, reject) => { await resolve(this.apiService.fetchStock(this.tempArr[i])) });
  //     setTimeout(async () => {
  //       i--;
  //       await this.test(i)
  //     }, 25000)

  //     Promise.all([promise]).then((values) => {
  //       console.log(values);
  //     });
  //   }
  //   // const promise2 = new Promise((resolve, reject) => { resolve(this.apiService.fetchStock('NFLX')) });
  // }






}
