import React, {  useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';


const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider

const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [userLoading, setUserLoading] = useState(true)

    const registerUser = (email, password) =>{
        setUserLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const logIn = (email, password) =>{
        setUserLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    const userProfileUpdate = (updatedData) =>{
        setUserLoading(true)
        return updateProfile(auth.currentUser, updatedData);
    }

    const googleSignIn = () =>{
        setUserLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    const passwordReset = (email) =>{
        return sendPasswordResetEmail(auth, email)
    }

    const logOut = () =>{
        return signOut(auth)
    }

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setUserLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
    })

    const authInfo = {
        user,
        setUser,
        registerUser,
        logOut,
        logIn,
        userLoading,
        setUserLoading,
        googleSignIn,
        userProfileUpdate,
        passwordReset
    }
    return (
        <AuthContext value={authInfo}>{children}</AuthContext>
    );
};

export default AuthProvider;