import {createSlice} from '@reduxjs/toolkit';
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
  },
  extraReducers: builder => {
    // update state depending on resonse
    builder.addCase(onAuthStateChange.fulfilled, (state, {payload}) => {
      ('builder.addCase > onAuthStateChanged > fulfilled');
      if (payload === undefined) {
        `No user`;
        return {
          ...state,
          isLoading: false,
        };
      } else {
        `User > onAuthStateChange.fulfilled > else` + payload.uid;
        return {
          profile: payload,
          userId: payload.uid,
          isLoading: false,
          isLoggedIn: true,
        };
      }
    });
    builder.addCase(onAuthStateChange.pending, (state, {payload}) => {
      'it pending', payload;
      return {...state, isLoading: true};
    });
    builder.addCase(onAuthStateChange.rejected, (state, {payload}) => {
      'it rejected', payload;
      return {...state, isLoading: false};
    });
    builder.addCase(logOut.fulfilled, (state, {payload}) => {
      'it fulfilled logOut', payload;
      return {
        ...state,
        profile: {
          firstname: undefined,
          lastname: undefined,
          interest: undefined,
          location: undefined,
          email: undefined,
          gender: undefined,
          dob: undefined,
          profilepicture: undefined,
          phoneNumber: undefined,
          coordinates: undefined,
          notifications: undefined,
          cvUrl: undefined,
          uid: undefined,
        },
        isLoading: false,
        isLoggedIn: false,
      };
    });
    builder.addCase(googleSignIn.fulfilled, (state, {payload}) => {
      'builder case > GoogleSignIn > fulfilled', state;
      //  ('it fulfilled', payload);
      state.profile;
      if (payload.error === 'success') {
        return {
          ...state,
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
      'it pending', payload;
      return {...state, isLoading: false};
    });
    builder.addCase(googleSignIn.rejected, (state, {payload}) => {
      'it rejected', payload;
      return {...state, isLoading: false};
    });
  },
});

export default user.reducer;
export const {logout, login} = user.actions;
