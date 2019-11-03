importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-messaging.js');

var firebaseConfig = {
  apiKey: "AIzaSyAm9BtTy7W89QE6AZ5i_2knlKFu3jDzARQ",
  authDomain: "cbshack-3c5ee.firebaseapp.com",
  databaseURL: "https://cbshack-3c5ee.firebaseio.com",
  projectId: "cbshack-3c5ee",
  storageBucket: "cbshack-3c5ee.appspot.com",
  messagingSenderId: "336492211195",
  appId: "1:336492211195:web:beb89ee21669bed57f395e",
  measurementId: "G-HGQYQRZGHW"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
