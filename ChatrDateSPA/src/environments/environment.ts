// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:5000/api/',
    firebase: {
        apiKey: "AIzaSyDCTp0fyN8svydB4lRhTCtZ567coR-zVu0",
        authDomain: "datingapp-chatr.firebaseapp.com",
        databaseURL: "https://datingapp-chatr-default-rtdb.firebaseio.com",
        projectId: "datingapp-chatr",
        storageBucket: "datingapp-chatr.appspot.com",
        messagingSenderId: "530942462043",
        appId: "1:530942462043:web:0b5487520be9918b7c977e",
        measurementId: "G-G0S0LCR1SS"
    }
}

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
