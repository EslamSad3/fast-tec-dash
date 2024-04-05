importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);
//the Firebase config object
// const firebaseConfig = {
//   apiKey: "AIzaSyBA7w3k2myOwnpsRbo75PS2vaf8L9naNEE",
//   authDomain: "fcmtest-a43b8.firebaseapp.com",
//   projectId: "fcmtest-a43b8",
//   storageBucket: "fcmtest-a43b8.appspot.com",
//   messagingSenderId: "762144589269",
//   appId: "1:762144589269:web:ceeb02fbb79d741924695c",
// };

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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload?.notification?.title;
  const notificationOptions = {
    body: payload?.notification?.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});