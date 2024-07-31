/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      state.data.push(action.payload);
    },
    addAllMessages: (state, action) => {
      console.log('!');
      console.log(action);
      state.data = action.payload;
    },
    deleteChannelMessages: (state, action) => {
      // state.data[action.payload] = [];
      state.data = state.data.filter((message) => action.channelId !== message.channelId);
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, addAllMessages, deleteChannelMessages } = messageSlice.actions;

export default messageSlice.reducer;
