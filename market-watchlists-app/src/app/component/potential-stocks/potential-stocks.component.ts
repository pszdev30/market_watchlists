import { Component, OnInit } from '@angular/core';
import { Ticker } from 'src/app/objects/ticker';
import { ApiService } from 'src/app/service/api.service';
import { AngularFireDatabase } from '@angular/fire/database';
import { TransferService } from 'src/app/service/transfer.service';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from 'src/app/dialog/dialog.component';

@Component({
  selector: 'app-potential-stocks',
  templateUrl: './potential-stocks.component.html',
  styleUrls: ['./potential-stocks.component.scss']
})
export class PotentialStocksComponent implements OnInit {
  ticker: string;
  results: any[] = [];
  potentialHoldings: string[] = [];

  constructor(private api: ApiService, private db: AngularFireDatabase, private transferService: TransferService, public dialog: MatDialog) { }

  ngOnInit() {
    this.transferService.refreshPotentialHoldingsClickedObservable$.subscribe(() => {
      this.potentialHoldings = []
      this.db.database.ref('/Potential Holdings').once('value').then((resp) => {
        for (const key in resp.val())
          this.potentialHoldings.push(resp.val()[key])
        this.triggerGetPotentialHoldings();
      });
    });


    this.transferService.getPotentialHoldingsObservable$.subscribe(() => {
      this.results = []
      for (var ticker of this.potentialHoldings) {
        this.api.getPotentialHoldings(ticker).subscribe((quote: any) => {
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
        this.addToPotentialHoldings(result);
      else
        return;
    });
  }


  triggerGetPotentialHoldings() {
    this.transferService.triggerGetPotentialHoldings(true);
  }


  addToPotentialHoldings(ticker: string) {
    this.db.database.ref('/Potential Holdings').child(ticker).set(ticker)
    this.triggerPotentialHoldingsRefresh();
  }


  removeFromPotentialHoldings(ticker: string) {
    this.db.database.ref('/Potential Holdings').child(ticker).remove()
    this.triggerPotentialHoldingsRefresh();
  }


  removeAllPotentialHoldings() {
    for (var potentialHolding of this.potentialHoldings)
      this.db.database.ref('/Potential Holdings').child(potentialHolding).remove()
    this.triggerPotentialHoldingsRefresh();
  }


  triggerPotentialHoldingsRefresh() {
    this.transferService.triggerPotentialHoldingsRefresh(true)
  }


  setTicker($event: any) {
    this.ticker = $event;
  }


  resetModal() {
    this.ticker = '';
  }

  
  reset() {
    this.potentialHoldings = []
    this.results = [];
  }


  resetAddToPotentialHoldingsModal() {
    this.ticker = '';
  }

}
