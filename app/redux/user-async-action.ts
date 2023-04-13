import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithGoogle, onAuthStateChangefirebase, logout } from "../services/firebase";

export const googleSignIn = createAsyncThunk('user/requestgoogleSignIn', async () => {
    console.log('googleSignin');

    const response = await signInWithGoogle();
    if (response) {
        return response // will be user 'success' or null 'error'
    }
});

export const onAuthStateChange = createAsyncThunk('user/requestonAuthStateChange', async () => {
    const response = await onAuthStateChangefirebase() // << <Remove comment afer fixing google auth
    if (response) {
        console.log('async > authstate > response > ', response);
        return response
    } else {
        console.log('async > authstate > response > ', response);
        return null
    }
});

export const logOut = createAsyncThunk('user/logout', async () => {
    const response = await logout()
    if (response) {
        return response
    }
});

