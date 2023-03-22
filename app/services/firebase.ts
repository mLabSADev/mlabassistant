
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';
console.log('Firebase');

GoogleSignin.configure({
  webClientId: '850465646909-2cfodnp5aquup07hi3kdiblasrr97bqg.apps.googleusercontent.com',
  offlineAccess: false
});

export async function signInWithGoogle() {
  return new Promise(async (resolve, reject) => {
    console.log('Firebase > signInWithGoogle');
    await GoogleSignin.signIn().then(async (res) => {
      console.log('Firebase > signInWithGoogle > signIn');

      const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
      await auth().signInWithCredential(googleCredential).then(async (authdata) => {
        console.log('Firebase > signInWithGoogle > signIn > signInWithCredential');
        var uid;
        await auth().onAuthStateChanged(async (user) => {
          console.log('Firebase > signInWithGoogle > signIn > signInWithCredential > onAuthStateChanged');
          if (user) {
            uid = user?.uid
            // Signed in
            console.log('Firebase > signInWithGoogle > signIn > signInWithCredential > onAuthStateChanged(SIGNED IN)');
          } else {
            // Signed out
            console.log('Firebase > signInWithGoogle > signIn > signInWithCredential > onAuthStateChanged(SIGNED OUT)');
          }
        })

        console.log(`<---else not new user signInWithGoogle ---->`);
        resolve({ message: authdata, error: `success` });
        //   }
        // })
      })
    })
      .catch((error) => {
        console.log(`Sign in catch`, error);
        resolve({ message: error.message, error: undefined });
      });
  })
}

export async function onAuthStateChangefirebase() {
  console.log('Firebase > onAuthStateChange');

  return new Promise((resolve, reject) => {
    return auth()
      .onAuthStateChanged(async (user) => {
        console.log('Firebase > onAuthStatechange > user ', user);

        if (user) {
          resolve(user);
          // await mongoAuth()
        } else {
          resolve(null);
        }
      })
  }).catch((error) => {
    console.log(`Error`, error);
    return error;
  })
}

export async function logout() {
  return new Promise((resolve, reject) => {
    auth().signOut();
    resolve(true)
  })
}