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
      const { channelId, messages } = action.payload;
      state.data[channelId] = messages;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addMessage, addAllMessages } = messageSlice.actions;

export default messageSlice.reducer;
