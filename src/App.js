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
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles';

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

  return (
    <div className="App">
      <section>
        {user ? <Chatroom/> : <SignIn/>}
      </section>
    </div>
  );
}

export default App;


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

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  appBar: {
    background: 'rgb(58, 58, 58)'
  },
  title: {
    flexGrow: 1,
  },
}));

export function Chatroom () {
  const classes = useStyles();
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
      <div className={classes.root}>
        <AppBar position="static" className={classes.appBar}>
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Messages
            </Typography>
            {
              auth.currentUser && (
                <IconButton edge="end" onClick={() => auth.signOut()} color="inherit" aria-label="menu">
                  <ExitToAppIcon />
                </IconButton>
              )
            }
          </Toolbar>
        </AppBar>
      </div>
      <main>
        {messages && messages.map(msg => <ChatMessage message={msg} key={msg.id} />)}
        <div ref={bottomPage}></div>
      </main>
      <form>
        <input type="text" value={formValue} onChange={e => setFormValue(e.target.value) } />
        <IconButton color="primary"
                    onClick={sendMessage} aria-label="send">
          <SendIcon style={{fontSize: '1.8rem'}} />
        </IconButton>
      </form>
    </React.Fragment>
  )
}

export function ChatMessage ({message}) {
  const {text, uid, photoURL} = message;

  const messageClass = uid === auth.currentUser.uid ? 'sent': 'received';
  return (
    <React.Fragment>
      <div className={`message ${messageClass}`}>
        <img src={photoURL} alt={uid}/>
        <p>{text}</p>
      </div>

    </React.Fragment>
  )

}