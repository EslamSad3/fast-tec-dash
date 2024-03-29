import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
const firebaseConfig = {
  apiKey: "AIzaSyBA7w3k2myOwnpsRbo75PS2vaf8L9naNEE",
  authDomain: "fcmtest-a43b8.firebaseapp.com",
  projectId: "fcmtest-a43b8",
  storageBucket: "fcmtest-a43b8.appspot.com",
  messagingSenderId: "762144589269",
  appId: "1:762144589269:web:ceeb02fbb79d741924695c",
};
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, {
        vapidKey: `BCKk4HHlwsWEsULePAzNDkOrRQr2-zl1gUvTuax3c6UDUOdf6DLxLC1cN_tFSfAxcwEJqYk17FuUlW-ke1wqQkk`,
      })
        .then((currentToken) => {
          if (currentToken) {
            console.log("Client Token: ", currentToken);
          } else {
            console.log("Failed to generate the app registration token.");
          }
        })
        .catch((err) => {
          console.log(
            "An error occurred when requesting to receive the token.",
            err
          );
        });
    } else {
      console.log("User Permission Denied.");
    }
  });
};



export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });

requestPermission();
