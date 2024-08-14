/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const userString = localStorage.getItem('user_data');
const userData = userString ? JSON.parse(userString) : null;

const initialState = {
  userData,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.userData = action.payload;
    },
    logOut: (state) => {
      state.userData = null;
    },
  },
});

export const { logIn, logOut } = userSlice.actions;

// Селектор для получения статуса авторизации
export const selectIsLoggedIn = (state) => !!state.user.userData;

export default userSlice.reducer;
