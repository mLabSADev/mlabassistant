import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithGoogle, onAuthStateChangefirebase, logout } from "../services/firebase";

export const onAuthStateChange = createAsyncThunk('user/requestonAuthStateChange', async () => {
    console.log('go in onAuthStateChangefirebase');
    const response = await onAuthStateChangefirebase() // << <Remove comment afer fixing google auth
    console.log(` onAuthStateChangefirebase`, response);
    if (response) {
        return response
    } else {
        // if user not signed it, trigger signin with google
        // signInWithGoogle() >>> Developer Error
    }
});

export const logOut = createAsyncThunk('user/logout', async () => {
    console.log(' logout');
    const response = await logout()
    if (response) {
        return response
    }
});

export const googleSignIn = createAsyncThunk('user/requestgoogleSignIn', async () => {
    console.log('go in signup googleSignIn');
    const response = await signInWithGoogle();
    if (response) {
        console.log(response);
        return response
    }
});