// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // scraper url
  // baseUrl: 'http://127.0.0.1:5000/',
  baseUrl: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=',
  apiKey: 'FW50D45U6ICU4CHA',
  firebaseConfig: {
    apiKey: "AIzaSyBNIzgzMSAIYXI5TNY64NIIcusy5dUtfLY",
    authDomain: "stock-market-watchlists.firebaseapp.com",
    databaseURL: "https://stock-market-watchlists.firebaseio.com",
    projectId: "stock-market-watchlists",
    storageBucket: "stock-market-watchlists.appspot.com",
    messagingSenderId: "188441381847",
    appId: "1:188441381847:web:673eccf25071c2ad619992",
    measurementId: "G-578KW9CD43"

  },
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
