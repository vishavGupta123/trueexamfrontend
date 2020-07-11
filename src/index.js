import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkqU2W03zb6OZBtqtf803cNBg-ohxakxI",
  authDomain: "bootcamp-8265e.firebaseapp.com",
  databaseURL: "https://bootcamp-8265e.firebaseio.com",
  projectId: "bootcamp-8265e",
  storageBucket: "bootcamp-8265e.appspot.com",
  messagingSenderId: "240091523370",
  appId: "1:240091523370:web:19aebde67f701912b95653",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

export default storage;
