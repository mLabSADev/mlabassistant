import auth from '@react-native-firebase/auth';

export const UserService = {
  uid: () => {
    return new Promise((resolve, reject) => {
      auth().onAuthStateChanged(user => {
        if (user) {
          resolve(user.uid);
        } else {
          reject(null);
        }
      });
    }).catch(e => {
      e;
    });
  },
};
