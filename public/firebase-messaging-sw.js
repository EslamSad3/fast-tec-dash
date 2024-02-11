// importScripts("https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging.js"
// );
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js")
//the Firebase config object
const firebaseConfig = {
  apiKey: "AIzaSyBA7w3k2myOwnpsRbo75PS2vaf8L9naNEE",
  authDomain: "fcmtest-a43b8.firebaseapp.com",
  projectId: "fcmtest-a43b8",
  storageBucket: "fcmtest-a43b8.appspot.com",
  messagingSenderId: "762144589269",
  appId: "1:762144589269:web:ceeb02fbb79d741924695c",
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

// const subscribeToTopic = async () => {
//   try {
//     console.log("testing");
//     await firebase.messaging.subscribeToTopic("admin");
//     console.log("Subscribed to topic successfully.");
//   } catch (error) {
//     console.log("Error subscribing to topic:", error);
//   }
// };

// subscribeToTopic();
