import { FlaskService } from './service/flask.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { interval, Subscription } from 'rxjs';
import { tick } from '@angular/core/testing';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'market-watchlists-app';
  ticker: string;
  testResp: any[] = [];
  firstCount: number = 0;

  constructor(private flaskService: FlaskService) { }

  ngOnInit() { }

  fetchStock(ticker: string) {
    if (this.firstCount == 0) {
      this.flaskService.fetchStock(ticker).subscribe((resp) => {
        console.log(resp);
        this.firstCount = 1;
      })
    }

    let mySub: Subscription;
    mySub = interval(60000).subscribe((func => {
      this.flaskService.fetchStock(ticker).subscribe((resp) => {
        console.log(resp)
      })
    }))
  }

  setTicker(ticker: string) {
    this.ticker = ticker;
  }

}
