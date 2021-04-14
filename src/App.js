import './App.css';
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth';
import {ChatRoom} from './Components/ChatRoom';
import {SignIn} from './Components/SignIn';
import {AuthContextProvider} from './Shared/Contexts/AuthContext';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_API_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_API_APP_ID
};

firebase.initializeApp(firebaseConfig)

function App() {
  const auth = firebase.auth();
  const [user] = useAuthState(auth);

  return (
    <AuthContextProvider auth={auth}>
      <div className="App">
        <section>
          {user ? <ChatRoom/> : <SignIn/>}
        </section>
      </div>
    </AuthContextProvider>
  );
}

export default App;