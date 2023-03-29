
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '850465646909-2cfodnp5aquup07hi3kdiblasrr97bqg.apps.googleusercontent.com',
  offlineAccess: false
});

export async function signInWithGoogle() {
  return new Promise(async (resolve, reject) => {
    await GoogleSignin.signIn().then(async (res) => {

      const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
      await auth().signInWithCredential(googleCredential).then(async (authdata) => {
        var uid;
        await auth().onAuthStateChanged(async (user) => {
          if (user) {
            uid = user?.uid
            // Signed in
          } else {
            // Signed out
          }
        })
        resolve({ message: authdata, error: `success` });
        //   }
        // })
      })
    })
      .catch((error) => {
        resolve({ message: error.message, error: undefined });
      });
  })
}

export async function onAuthStateChangefirebase() {


  return new Promise((resolve, reject) => {
    return auth()
      .onAuthStateChanged(async (user) => {

        if (user) {
          resolve(user);
          // await mongoAuth()
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