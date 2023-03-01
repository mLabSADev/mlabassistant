import {createSlice} from '@reduxjs/toolkit';

const user = createSlice({
  name: 'services',
  initialState: {
    services: [
      {
        id: '',
        name: '',
        description: '',
        location: {
          lat: null,
          lng: null,
        },
        email: '',
        phone: '',
        rating: 0,
      },
    ], // example model for services
    loading: false,
  },
});

export default user.reducer;
