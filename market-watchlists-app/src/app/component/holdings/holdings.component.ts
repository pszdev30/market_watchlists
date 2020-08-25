import { TransferService } from './../../service/transfer.service';
import { Component, OnInit, ɵConsole } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Ticker } from 'src/app/objects/ticker';
import { AngularFireDatabase } from '@angular/fire/database';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss']
})
export class HoldingsComponent implements OnInit {
  ticker: string;
  results: any[] = [];
  holdings: string[] = [];

  constructor(private api: ApiService, private db: AngularFireDatabase, private transferService: TransferService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.transferService.refreshHoldingsClickedObservable$.subscribe(() => {
      this.holdings = [];
      this.db.database.ref('/Holdings').once('value').then((resp) => {
        for (const key in resp.val())
          this.holdings.push(resp.val()[key])
        this.triggerGetHoldings();
      });
    });


    this.transferService.getHoldingsObservable$.subscribe(() => {
      this.results = []
      for (var ticker of this.holdings) {
        this.api.getHoldings(ticker).subscribe((quote: any) => {
          console.log(quote)
          let ticker: Ticker = new Ticker();
          ticker.name = quote.symbol;
          ticker.lastPrice = quote.latestPrice.toFixed(2);
          ticker.change = quote.change.toFixed(2);
          ticker.percentChange = quote.changePercent.toFixed(2);

          if (ticker.change > 0) ticker.positive = true
          else ticker.positive = false;

          this.results.push(ticker)

        });
      }
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogComponent, {});

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined)
        this.addToHoldings(result);
      else
        return;
    });
  }

  triggerGetHoldings() {
    this.transferService.triggerGetHoldings(true);
  }

  addToHoldings(ticker: string) {
    this.db.database.ref('/Holdings').child(ticker).set(ticker)
    this.triggerRefresh()
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
  }

}
