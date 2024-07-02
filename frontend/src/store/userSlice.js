/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = { token: '', username: '' };

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    deleteUser: (state) => {
      state.username = '';
      state.token = '';
    },
    addUser: (state, action) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
    },
  },
});

// Action creators are generated for each case reducer function
export const { deleteUser, addUser } = userSlice.actions;

export default userSlice.reducer;
