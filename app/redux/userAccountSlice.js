import {createSlice} from '@reduxjs/toolkit';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
const initialState = {
  user: 'mLab Assistant',
  image: '',
  isSignedIn: false,
};

export const accountSlice = createSlice({
  name: 'userAccount',
  initialState: initialState,
  reducers: {
    signIn: (state, payload) => {
      state.user = payload.payload.user;
      state.isSignedIn = payload.payload.isSignedIn;
      state.image = payload.payload.image;
    },
    checkAuthState: async state => {
      await GoogleSignin.configure();
      const isSignedIn = await GoogleSignin.isSignedIn();
      if (isSignedIn) {
        const currentUser = await GoogleSignin.getCurrentUser();
        console.log(currentUser);
      } else {
      }
    },
    signOut: async state => {
      try {
        await GoogleSignin.signOut();
        state.user = '';
      } catch (error) {
        console.error(error);
      }
    },
  },
});
export const {signIn, checkAuthState, signOut} = accountSlice.actions;
export default accountSlice.reducer;
