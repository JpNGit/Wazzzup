import '../App.css';
import React, {useState, useRef, useContext} from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {useCollectionData} from 'react-firebase-hooks/firestore'
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles } from '@material-ui/core/styles';
import {ChatMessage} from './ChatMessage'
import {AuthContext} from '../Shared/Contexts/AuthContext'

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

export function ChatRoom () {
  const {auth, firestore} = useContext(AuthContext);
  const classes = useStyles();
  const messageRef = firestore.collection("messages");
  const query = messageRef.orderBy('createdAt').limit(25);
  const [messages] = useCollectionData(query, {idField: 'id'});
  const [formValue, setFormValue] = useState('');
  const bottomPage = useRef();

  const sendMessage = async() => {
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
        <AppBar position="fixed" className={classes.appBar}>
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