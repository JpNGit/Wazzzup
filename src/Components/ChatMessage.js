import '../App.css';
import React, {useContext} from 'react';
import 'firebase/firestore';
import 'firebase/auth';
import {AuthContext} from '../Shared/Contexts/AuthContext'

export function ChatMessage ({message}) {
  const {text, uid, photoURL} = message;
  const {auth} = useContext(AuthContext);

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