// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  // scraper url
  // baseUrl: 'http://127.0.0.1:5000/',
  // alphaVantageBaseUrl: 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=',
  // alphaVantageApiKey: 'FW50D45U6ICU4CHA',
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

  //IEX Cloud API config
  IEX_BASE_URL: 'https://cloud.iexapis.com/stable/stock/',
  IEX_BASE_SANDBOX_URL: 'https://sandbox.iexapis.com/stable/stock/',
  IEX_API_TOKEN: 'pk_4a09995ad6854e28a38018bdd36eb410',
  IEX_API_TEST_TOKEN: 'Tpk_12e6eee6ed7d4026a0a87dee063b86bd',
  IEX_API_SECRET_TOKEN: 'sk_ab7c1d3c8db94a309d4adf0b68d5c521',
  IEX_API_SECRET_VERSION: 'beta',
  IEX_API_ENV: 'cloud',

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
