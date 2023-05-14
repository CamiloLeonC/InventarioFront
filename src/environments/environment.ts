// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,

  // AppUrl: "https://proyectocolegioubala.azurewebsites.net",
  AppUrl: "https://localhost:44372",
  firebase:{
    apiKey: "AIzaSyC41u_3TYwpTYYqRcYlUDOgxbchBnBBn_Y",
    authDomain: "sistema-ubala.firebaseapp.com",
    projectId: "sistema-ubala",
    storageBucket: "sistema-ubala.appspot.com",
    messagingSenderId: "391455208687",
    appId: "1:391455208687:web:a24225550a81468f1f971a"
  } 
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
