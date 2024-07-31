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
      state.data = action.payload;
    },
    deleteChannelMessages: (state, action) => {
      state.data = state.data.filter((message) => action.channelId !== message.channelId);
    },
  },
});
export const { addMessage, addAllMessages, deleteChannelMessages } = messageSlice.actions;

export default messageSlice.reducer;
