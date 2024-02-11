importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

//the Firebase config object
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

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  messaging
    .subscribeToTopic("admin")
    .then(() => console.log("Subscribed to topic!"));

  self.registration.showNotification(notificationTitle, notificationOptions);
});
