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
  apiKey: "AIzaSyBRa0Uy5coEfOLH8OESi6JhTwQt63HkSD4",
  authDomain: "wazzzup-2523d.firebaseapp.com",
  projectId: "wazzzup-2523d",
  storageBucket: "wazzzup-2523d.appspot.com",
  messagingSenderId: "886263508835",
  appId: "1:886263508835:web:82e94a900a4cc655c32d56"
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