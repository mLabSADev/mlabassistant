import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithGoogle, onAuthStateChangefirebase, logout } from "../services/firebase";
console.log('UAA');

export const onAuthStateChange = createAsyncThunk('user/requestonAuthStateChange', async () => {
    console.log('UAA > onAuthStateChange');
    const response = await onAuthStateChangefirebase() // << <Remove comment afer fixing google auth
    if (response) {
        console.log('UAA > onAuthStateChange > reponse');
        return response
    } else {
        console.log('UAA > onAuthStateChange > error');
        // if user not signed it, trigger signin with google
        signInWithGoogle()// >>> Developer Error
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
    console.log('UAA > googleSignIn');
    const response = await signInWithGoogle();
    if (response) {
        console.log('UAA > googleSignIn > response');
        return response
    }
});