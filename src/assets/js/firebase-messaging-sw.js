
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.11.1/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyBCgN-NAlBARjRbg2NOg0LeSBV3OdPbJ4w",
    authDomain: "dangeralertapp-d22f9.firebaseapp.com",
    projectId: "dangeralertapp-d22f9",
    storageBucket: "dangeralertapp-d22f9.appspot.com",
    messagingSenderId: "231905122264",
    appId: "1:231905122264:web:33f7eeab75cfa8bbdf84ad",
    measurementId: "G-FQ9KLF0HY5"
});
const messaging = firebase.messaging();