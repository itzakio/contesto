import React, { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.config";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userLoading, setUserLoading] = useState(true);

  const registerUser = (email, password) => {
    setUserLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setUserLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userProfileUpdate = (updatedData) => {
    setUserLoading(true);
    return updateProfile(auth.currentUser, updatedData);
  };

  const googleSignIn = () => {
    setUserLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const passwordReset = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const logOutHandler = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setUserLoading(false);
    });
    return () => {
      unsubscribe();
    };
  });

  const authInfo = {
    user,
    setUser,
    registerUser,
    logOutHandler,
    logIn,
    userLoading,
    setUserLoading,
    googleSignIn,
    userProfileUpdate,
    passwordReset,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
