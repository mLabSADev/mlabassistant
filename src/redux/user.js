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
  extraReducers: (builder) => {
    builder.addCase(onAuthStateChange.fulfilled, (state, {payload}) => {
      console.log('it fulfilled', payload);
      if (payload === undefined) {
        console.log(`in if statement`);
        return {
          ...state,
          isLoading: false,
        };
      } else {
        console.log(`in else statement`);
        return {
          ...state,
          //userId: payload,
          isLoading: false,
          isLoggedIn: true,
        };
      }
    });

    builder.addCase(onAuthStateChange.pending, (state, {payload}) => {
      console.log('it pending', payload);
      return {...state, isLoading: true};
    });
    builder.addCase(onAuthStateChange.rejected, (state, {payload}) => {
      console.log('it rejected', payload);
      return {...state, isLoading: false};
    });
    builder.addCase(logOut.fulfilled, (state, {payload}) => {
      console.log('it fulfilled logOut', payload);
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
      console.log('it fulfilled state', state);
      // console.log('it fulfilled', payload);
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
      console.log('it pending', payload);
      return {...state, isLoading: false};
    });
    builder.addCase(googleSignIn.rejected, (state, {payload}) => {
      console.log('it rejected', payload);
      return {...state, isLoading: false};
    });
  },
});

export default user.reducer;
export const {logout, login} = user.actions;
