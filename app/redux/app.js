const {createSlice} = require('@reduxjs/toolkit');

const app = createSlice({
  name: 'app',
  initialState: {
    loader: {
      isLoading: false,
      message: null,
    },
    botType: 'Welcome',
  },
  reducers: {
    showLoading: (state, {payload}) => {
      state.loader = {
        isLoading: true,
        message: payload,
      };
    },
    hideLoading: state => {
      state.loader = {
        isLoading: false,
        message: null,
      };
    },
    setBotType: (state, {payload}) => {
      state.botType = payload;
    },
  },
});

export const {showLoading, hideLoading, setBotType} = app.actions;

export default app.reducer;
