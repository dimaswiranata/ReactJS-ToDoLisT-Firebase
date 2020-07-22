import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBVS3CFDkYnr-3eqKd-FGN3giMNr1aweqE",
  authDomain: "todo-web-51b46.firebaseapp.com",
  databaseURL: "https://todo-web-51b46.firebaseio.com",
  projectId: "todo-web-51b46",
  storageBucket: "todo-web-51b46.appspot.com",
  messagingSenderId: "232240141468",
  appId: "1:232240141468:web:32c68903a0cb3cd35b0959",
  measurementId: "G-PM61HZLE7Y"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();

export {
  db,
  auth
}