// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  //apiUrl: 'https://atma-digital-staging.herokuapp.com/',
  //apiUrl: 'http://10.251.2.21:8080/',
  //apiUrl:"http://10.250.1.62:8443/",
  apiUrl:"http://localhost:8443/",
  //apiUrl: "https://api.facaacordo.com.br:8444/",
  iugu: 'https://api.iugu.com/v1/',
  correios: 'https://viacep.com.br/ws/',
  iuguTestMode: true,
  googleAnalyticsKey: '1',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';
// Included with Angular CLI.
