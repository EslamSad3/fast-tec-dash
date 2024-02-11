// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWV0FWlIooBnWW7ncOZUO3EPhU0ii5ndY",
  authDomain: "fast-tec-a80fd.firebaseapp.com",
  databaseURL: "https://fast-tec-a80fd-default-rtdb.firebaseio.com",
  projectId: "fast-tec-a80fd",
  storageBucket: "fast-tec-a80fd.appspot.com",
  messagingSenderId: "951524565584",
  appId: "1:951524565584:web:999a5e2032b72c26eea755",
  measurementId: "G-ZX820ND3Q4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

export const requestPermission = () => {
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");
      return getToken(messaging, {
        vapidKey: `BMIeydStJAtXdM_GcSB-o2S-SQbmQ384TCdB5cbMBv14LegaDV38aU5HmbVHaqBkIboqGoGd7pQVjNp8-hpOkoE`,
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

requestPermission();

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
