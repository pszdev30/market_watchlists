# Stock Market Watchlists

### Created streamlined watchlists app to track performance of current holdings, potential investments, & prominent stocks in a specific industry   
<br>

## Installation
Just head over to https://stock-market-watchlists.web.app 

## Why I made it
As a Robinhood user (lol), I grew tired of the single watchlist the app supports and didn't want to download a separate app just to make multiple watchlists. My list had grown to well over 50 stocks, and it was basically impossible to track them efficiently


## How it works 
- App is deployed on Firebase & uses their Realtime Database to store the tickers for each watchlist

- The Angular frontend calls the [IEX Cloud API](https://iexcloud.io/) (it's the only free one I could find that didn't have an easily reachable limit on the number & frequency of calls I can make) to receive stock data for each ticker

- Created a scraper using Python + Selenium to parse information on the major indexes from Yahoo Finance and display in the frontend

- Flow of the frontend: Firebase &#8594; IEX Cloud &#8594; Intercept response + do some handling &#8594; Parse &#8594; Display 

- Flow of the backend: Scrape &#8594; Parse &#8594; Send to frontend

<<<<<<< HEAD
## Code Snippet
![snippet](https://github.com/pszdev30/market_watchlists/blob/master/code%20snippet.png)

## What I'm working on now
- Editable column names

- Live reloading (I've failed on this a couple times but hopefully I'll get it soon)

- Implement the scraper in frontend navigation bar to get a better idea of overall market performance 
||||||| 1c53592
## What's in the works
=======
## What I'm working on now
Editable column names

Live reloading (I've failed on this a couple times but hopefully it'll happen soon)

Add indexes across the navigation bar to get a better idea of overall market performance
>>>>>>> 2ff4c272b89057cafef6348a8ade5e5ffb7b7ebd

## Future
<<<<<<< HEAD
- Allow for input of details regarding my positions in the companies & expand the card 


||||||| 1c53592
=======

## Suggestions
Have suggestions to improve the app? 
>>>>>>> 2ff4c272b89057cafef6348a8ade5e5ffb7b7ebd
