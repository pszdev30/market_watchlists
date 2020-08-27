# Stock Market Watchlists

Created streamlined watchlists app to track performance of current holdings, potential investments, & prominent stocks in a specific industry   

## Why I made it
As a Robinhood user (lol), I grew tired of the single watchlist the app supports and didn't want to download a separate app just to make multiple watchlists. My list had grown to well over 50 stocks, and it was basically impossible to track them efficiently

## Installation
None! Just head over to https://stock-market-watchlists.web.app 

## How it works 
- App is deployed w/ Firebase hosting & uses Firebase Realtime DB to store the tickers for each watchlist

- The Angular frontend calls the [IEX Cloud API](https://iexcloud.io/) (it's the only free one I could find that didn't have an easily reachable limit on the number & frequency of calls I can make) to receive stock data for each ticker

- Created a scraper using Python + Selenium to parse information on the major indexes from Yahoo Finance and display in the frontend

- Flow of the frontend: **Firebase** &#8594; **IEX Cloud** &#8594; **Intercept response + do some handling** &#8594; **Parse** &#8594; **Display** 

- Flow of the backend: **Scrape** &#8594; **Parse** &#8594; **Send to frontend**

## Code Snippets
Parsing the API response:
```typescript
    this.transferService.getHoldingsObservable$.subscribe(() => {
      this.results = [];
      for (var ticker of this.holdings) {
        this.api.getHoldings(ticker).subscribe((quote: any) => {
          let ticker: Ticker = new Ticker();

          ticker.name = quote.symbol;
          ticker.lastPrice = quote.latestPrice.toFixed(2);
          ticker.change = quote.change.toFixed(2);
          ticker.percentChange = quote.changePercent.toFixed(2);

          if (ticker.change > 0) ticker.positive = true;
          else ticker.positive = false;

          this.results.push(ticker);

        });
      }
    });
```
Intercepting ```
 GET ``` request:

```typescript
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(catchError((error: HttpErrorResponse) => {
      let url = httpRequest.urlWithParams;
      let urlSplit = url.split('/');
      let ticker = urlSplit[5];
      let errorMessage = `Error Code: ${error.status},  Message: ${error.message}`;

      if (error.status == 404) {
        this.snackBar.open(serverError, action, {
          duration: 3500,
        });

        this.db.database.ref('/Holdings').child(ticker).remove();
        this.db.database.ref('/Potential Holdings').child(ticker).remove();
        this.db.database.ref('/Random').child(ticker).remove();
        
        this.transfer.stopRefresh(true);
        
        return throwError(errorMessage);
      }
      this.transfer.stopRefresh(false);
    }));
  }

```


## What I'm working on now
- Editable column names

- Live reloading (I've failed on this a couple times but hopefully I'll get it soon)

- Implement the scraper in frontend navigation bar to get a better idea of overall market performance 


## When I'm done with ^^
- Essentially create a "Google" search page in which I can search for a stock and view its advanced stats, news, analyst recommendations, earnings estimates, etc. in one clean view 

