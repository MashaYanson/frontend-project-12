/* eslint-disable no-param-reassign */
/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { isLoggedIn: false, userData: null };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser: (state) => {
      state.userData = null;
    },
    logIn: (state, action) => {
      state.userData = action.payload;
      state.isLoggedIn = true;
    },
    logOut: (state) => {
      state.isLoggedIn = false;
      state.userData = null;
    },
  },
});
export const {
  deleteUser, logIn, logOut,
} = userSlice.actions;

export default userSlice.reducer;
