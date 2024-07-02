/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: {} };

export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: (state, action) => {
      const { channelId, message } = action.payload;
      if (state.data[channelId]) {
        state.data[channelId].push(message);
      } else {
        state.data[channelId] = [];
        state.data[channelId].push(message);
      }
    },
    addAllMessages: (state, action) => {
      const messages = action.payload;
      messages.forEach((message) => {
        if (!state.data[message.channelId]) {
          state.data[message.channelId] = [];
        }
        state.data[message.channelId].push(message);
      });
    },
    deleteChannelMessages: (state, action) => {
      // state.data[action.payload] = [];
      delete state.data[action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, addAllMessages, deleteChannelMessages } = messageSlice.actions;

export default messageSlice.reducer;
