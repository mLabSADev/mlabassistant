import {createSlice} from '@reduxjs/toolkit';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  onAuthStateChange,
  logOut,
  googleSignIn,
} from '../redux/user-async-action';
const user = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    userId: null,
    isLoading: false,
    isLoggedIn: false,
    error: {
      message: '',
      state: false,
    },
  },
  extraReducers: builder => {
    // update state depending on resonse
    builder.addCase(onAuthStateChange.fulfilled, (state, {payload}) => {
      if (!payload) {
        return {
          ...state,
          isLoading: false,
        };
      } else {
        return {
          profile: payload,
          userId: payload?.uid,
          isLoading: false,
          isLoggedIn: true,
        };
      }
    });
    builder.addCase(onAuthStateChange.pending, (state, {payload}) => {
      return {...state, isLoading: true};
    });
    builder.addCase(onAuthStateChange.rejected, (state, {payload}) => {
      return {...state, isLoading: false};
    });
    builder.addCase(logOut.fulfilled, (state, {payload}) => {
      return {
        ...state,
        profile: {},
        isLoading: false,
        isLoggedIn: false,
      };
    });
    builder.addCase(googleSignIn.fulfilled, (state, {payload}) => {
      if (payload.error === 'success') {
        return {
          ...state,
          profile: payload,
          isLoading: false,
          isLoggedIn: true,
        };
      } else if (payload.error === 'newUser') {
        return {
          ...state,
          isLoading: false,
          isLoggedIn: true,
        };
      } else {
        return {
          ...state,
          isLoading: false,
          isLoggedIn: false,
        };
      }
    });
    builder.addCase(googleSignIn.pending, (state, {payload}) => {
      console.log('signin pending');
      return {...state, isLoading: false};
    });
    builder.addCase(googleSignIn.rejected, (state, {payload}) => {
      console.log('signin failed');
      return {...state, isLoading: false};
    });
  },
});

export default user.reducer;
export const {logout, login} = user.actions;
