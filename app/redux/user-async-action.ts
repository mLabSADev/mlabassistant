import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithGoogle, onAuthStateChangefirebase, logout } from "../services/firebase";
('UAA');

export const onAuthStateChange = createAsyncThunk('user/requestonAuthStateChange', async () => {
    ('UAA > onAuthStateChange');
    const response = await onAuthStateChangefirebase() // << <Remove comment afer fixing google auth
    if (response) {
        ('UAA > onAuthStateChange > reponse');
        return response
    } else {
        ('UAA > onAuthStateChange > error');
        // if user not signed it, trigger signin with google
        signInWithGoogle()// >>> Developer Error
    }
});

export const logOut = createAsyncThunk('user/logout', async () => {
    (' logout');
    const response = await logout()
    if (response) {
        return response
    }
});

export const googleSignIn = createAsyncThunk('user/requestgoogleSignIn', async () => {
    ('UAA > googleSignIn');
    const response = await signInWithGoogle();
    if (response) {
        ('UAA > googleSignIn > response');
        return response
    }
});