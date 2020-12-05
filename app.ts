/*
In NativeScript, the app.ts file is the entry point to your application.
You can use this file to perform app-level initialization, but the primary
purpose of the file is to pass control to the app’s first module.
*/

import { Application } from '@nativescript/core';
import { LocalNotifications } from "nativescript-local-notifications";
// import { firebase } from "@nativescript/firebase";

// firebase.init({
//   onPushTokenReceivedCallback: function(token) {
//     console.log("Firebase push token: " + token);
//   },
//   showNotificationsWhenInForeground: true,
//   onMessageReceivedCallback: function(message) {
//     console.log("Title: " + message.title);
//     console.log("Body: " + message.body);
//     // if your server passed a custom property called 'foo', then do this:
//     console.log("Value of 'foo': " + message.data.foo);
//   },
//   }).then(
//     () => {
//       console.log("firebase.init done");
//     },
//     error => {
//       console.log(`firebase.init error: ${error}`);
//     }
//   );
//   firebase.subscribeToTopic("lugares").then(() => console.log("Subscribed to topic"));


LocalNotifications.schedule([{
  id: 1,
  title: 'The first title',
  body: 'The first  body',
  ticker: 'The ticker',
  badge: 1,
  sound: "sound1", //sound1 from /Appresources/raw/ folder
  at: new Date(new Date().getTime() + (5 * 1000)) 
}]).then(
    function() {
      console.log("Notification scheduled 1");
    },
    function(error) {
      console.log("scheduling error: " + error);
    }
);

Application.run({ moduleName: 'app-root' });

/*
Do not place any code after the application has been started as it will not
be executed on iOS.
*/
