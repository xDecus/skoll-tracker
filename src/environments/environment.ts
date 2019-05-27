// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    firebase: {
        apiKey: 'AIzaSyAl56MfFZCxS_KrHbd7U0JowjkTEiwmoUE',
        authDomain: 'skollstrength.web.app',
        databaseURL: 'https://skoll-7737d.firebaseio.com',
        projectId: 'skoll-7737d',
        storageBucket: 'skoll-7737d.appspot.com',
        messagingSenderId: '168564730535'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
import 'zone.js/dist/zone-error'; // Included with Angular CLI.
