import '../App.css';
import React, {useContext}  from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import logo from '../Shared/Assets/wazzzup_background.png'
import googleLogo from '../Shared/Assets/google_logo.svg'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import {AuthContext} from '../Shared/Contexts/AuthContext'

export function SignIn () {
  const {auth} = useContext(AuthContext);

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