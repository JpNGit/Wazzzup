import './App.css';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
// import {useAuthState}

const firebaseConfig = {
  apiKey: "AIzaSyBRa0Uy5coEfOLH8OESi6JhTwQt63HkSD4",
  authDomain: "wazzzup-2523d.firebaseapp.com",
  projectId: "wazzzup-2523d",
  storageBucket: "wazzzup-2523d.appspot.com",
  messagingSenderId: "886263508835",
  appId: "1:886263508835:web:d974b9d446f2f2d9c32d56"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {


  return (
    <div className="App">
      <header className="App-header">
        <div>Starter</div>
      </header>
    </div>
  );
}

export default App;
