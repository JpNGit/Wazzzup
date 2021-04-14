import './App.css';
import React, {useState, useRef} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useAuthState} from 'react-firebase-hooks/auth'
import {useCollectionData} from 'react-firebase-hooks/firestore'
import logo from './Assets/wazzzup_background.png'
import googleLogo from './Assets/google_logo.svg'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const firebaseConfig = {
  apiKey: "AIzaSyBRa0Uy5coEfOLH8OESi6JhTwQt63HkSD4",
  authDomain: "wazzzup-2523d.firebaseapp.com",
  projectId: "wazzzup-2523d",
  storageBucket: "wazzzup-2523d.appspot.com",
  messagingSenderId: "886263508835",
  appId: "1:886263508835:web:82e94a900a4cc655c32d56"
};

firebase.initializeApp(firebaseConfig)

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);
  // const [] = useCollectionData();

  return (
    <div className="App">
      <section>
        {user ? <Chatroom/> : <SignIn/>}
      </section>
    </div>
  );
}

export default App;

export function SignOut () {
  return auth.currentUser && (
    <button onClick={() => auth.signOut()}>Sign Out</button>
  )
}

export function SignIn () {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
  }

  return (
    <React.Fragment>
      <img src={logo} alt="logo" className="logo" />
      <Typography variant="h2" className="heading" gutterBottom>
        WazzzUp!
      </Typography>
      <Box justifyContent="center" display="flex" mt={2}>
        <Button variant="contained" className="loginBtn"
                startIcon={<img src={googleLogo} alt="google" />}
                onClick={signInWithGoogle}>Sign In with Google</Button>
      </Box>
    </React.Fragment>
  )
}

export function Chatroom () {
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');
  const bottomPage = useRef();

  const sendMessage = async(e) => {
    e.preventDefault()
    const {uid, photoURL} = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    bottomPage?.current.scrollIntoView({behavior: 'smooth'});
  }

  return (
    <React.Fragment>

      <main>
        <SignOut/>
        {messages && messages.map(msg => <ChatMessage message={msg} key={msg.id} />)}
        <div ref={bottomPage}></div>
      </main>
      <form onSubmit={sendMessage}>
        <input type="text" value={formValue} onChange={e => setFormValue(e.target.value) } />
        <button type="submit">Send</button>
      </form>
    </React.Fragment>
  )
}

export function ChatMessage ({message}) {
  const {text, uid, photoURL} = message;

  const messageClass = uid === auth.currentUser.id ? 'sent': 'received';
  return (
    <React.Fragment>
      <div className={`message ${messageClass}`}>
        <img src={photoURL}/>
        <p>{text}</p>
      </div>

    </React.Fragment>
  )

}