
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '850465646909-2cfodnp5aquup07hi3kdiblasrr97bqg.apps.googleusercontent.com',
  offlineAccess: false
});

export async function signInWithGoogle() {
  console.log('Signin G');

  return new Promise(async (resolve, reject) => {
    const hasPlay = await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('signin >> ', hasPlay);

    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    const user = await (await auth().signInWithCredential(googleCredential)).user
    resolve({ message: user, error: `success` });
  })
}

export async function onAuthStateChangefirebase() {
  return new Promise((resolve, reject) => {
    return auth()
      .onAuthStateChanged(async (user) => {
        if (user) {
          resolve(user);
        } else {
          resolve(null);
        }
      })
  }).catch((error) => {
    return error;
  })
}

export async function logout() {
  return new Promise((resolve, reject) => {
    auth().signOut();
    resolve(true)
  })
}