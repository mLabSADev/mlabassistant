const {createSlice} = require('@reduxjs/toolkit');

const app = createSlice({
  name: 'app',
  initialState: {
    loader: {
      isLoading: false,
      message: null,
    },
  },
  reducers: {
    showLoading: (state, {payload}) => {
      state.loader = {
        isLoading: true,
        message: payload,
      };
    },
    hideLoading: (state) => {
      state.loader = {
        isLoading: false,
        message: null,
      };
    },
  },
});

export const {showLoading, hideLoading} = app.actions;

export default app.reducer;
