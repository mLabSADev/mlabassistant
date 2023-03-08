
import auth from '@react-native-firebase/auth';

import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  webClientId: '342693065995-tengdfu4s06ahbl5a7u38b2g3qrk1bi4.apps.googleusercontent.com',
  offlineAccess: false
});

export async function signInWithGoogle() {
  return new Promise(async (resolve, reject) => {
    await GoogleSignin.signIn().then(async (res) => {
      const googleCredential = auth.GoogleAuthProvider.credential(res.idToken);
      await auth().signInWithCredential(googleCredential).then(async (authdata) => {
        var user = authdata.user;
        var uid = auth().currentUser.uid;
        console.log('User ID: ', uid)

        console.log(`<---else not new user signInWithGoogle ---->`);
        resolve({ message: authdata, error: `success` });
        //   }
        // })
      })
    })
      .catch((error) => {
        console.log(error.code);
        console.log(`Error`, error);
        resolve({ message: error.message, error: undefined });
      });
  })
}

export async function onAuthStateChangefirebase() {
  return new Promise((resolve, reject) => {
    return auth()
      .onAuthStateChanged(async (user) => {

        if (user) {
          resolve(user.uid);
          // await mongoAuth()
        } else {
          resolve(undefined);
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