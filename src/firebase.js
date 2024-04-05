import axios from "axios";
import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

import messageSound from "./assets/sounds/notification_sound.mp3";

const firebaseConfig = {
  apiKey: "AIzaSyBTxgt0a9163-cEO6tmq7yCU9MOIm1T9Hs",
  authDomain: "fast-tec-app.firebaseapp.com",
  databaseURL: "https://fast-tec-app-default-rtdb.firebaseio.com",
  projectId: "fast-tec-app",
  storageBucket: "fast-tec-app.appspot.com",
  messagingSenderId: "603004788008",
  appId: "1:603004788008:web:ded433da95ffcaf5b5c41d",
  measurementId: "G-C5ZPECRS8E",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const sound = new Audio(messageSound);
// const notification = new Notification();

export const requestPermission = () => {
  let adminheaders = {
    Authorization: `${localStorage.getItem("AdminToken")}`,
  };
  console.log("Requesting User Permission......");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("Notification User Permission Granted.");

      return getToken(messaging, {
        vapidKey: `BLMex01Lv57zVTwZwbsScH_lgJqDmJZiMuI2nF8sadJj6SoLKVGlco9oOSM9SyZZvZ0I10je67R_uPqeJ2psDEY`,
      })
        .then((currentToken) => {
          if (currentToken) {
            axios.put(
              `${process.env.REACT_APP_BASE_URL}/auth/admin/add-admin-token.php`,
              {
                fcmToken: currentToken,
              },
              { headers: { ...adminheaders } }
            );
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
