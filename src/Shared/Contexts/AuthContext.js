import React, { createContext } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

export const AuthContext = createContext();

export const AuthContextProvider = ({children, auth}) =>  {
  const firestore = firebase.firestore();

  return (
    <AuthContext.Provider value={{auth, firestore}}>
      {children}
    </AuthContext.Provider>
  );
}