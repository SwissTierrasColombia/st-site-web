// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
const apiBaseUrl = 'http://192.168.98.61:8090';
export const environment = {
  production: false,
  apiBaseUrl,
  apiBaseUrlPrefix: apiBaseUrl + '/api',
  nameTokenSession: 'access_token_st',
  clientUsername: 'st-web-develop-dvKDKgQr',
  clientPassword: '12345'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
