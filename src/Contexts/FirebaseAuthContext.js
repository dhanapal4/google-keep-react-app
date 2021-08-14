import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase";

const FirebaseAuthContext = createContext();

export const useFirebaseAuth = () => {
  return useContext(FirebaseAuthContext);
};

const FirebaseAuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signup = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };

  const login=(email,password)=>{
      return auth.signInWithEmailAndPassword(email,password);
  }

  useEffect(() => {
    const unsubscrive = auth.onAuthStateChanged((user) => {
        setLoading(false)
      setCurrentUser(user);
    });
    return unsubscrive;
  }, []);

  const value = {
    currentUser,
    login,
    signup
  };
  return (
    <FirebaseAuthContext.Provider value={value}>
      {!loading && props.children}
    </FirebaseAuthContext.Provider>
  );
};

export default FirebaseAuthProvider;
