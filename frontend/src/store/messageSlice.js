/* eslint-disable no-param-reassign,no-unused-vars */
// import { createSelector, createSlice } from '@reduxjs/toolkit';
//
// const initialState = { data: [] };
// const messagesAdapter = createEntityAdapter();
//
//
// export const messageSlice = createSlice({
//   name: 'messages',
//   initialState
//   reducers: {
//     addMessage: (state, action) => {
//       state.data.push(action.payload);
//     },
//     addAllMessages: (state, action) => {
//       state.data = action.payload;
//     },
//     deleteChannelMessages: (state, action) => {
//       state.data = state.data.filter((message) => action.channelId !== message.channelId);
//     },
//
//   },
// });
// export const selectMessagesByChannelId = createSelector(
//   (state) => state.messages.data,
//   (_, channelId) => channelId,
//   (messagesData, channelId) => messagesData.filter((msg) => msg.channelId === channelId),
// );
//
// export const { addMessage, addAllMessages, deleteChannelMessages } = messageSlice.actions;
//
// export default messageSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSelector, createSlice } from '@reduxjs/toolkit';

// Начальное состояние
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
      const channelId = action.payload;
      state.data = state.data.filter((message) => message.channelId !== channelId);
    },
  },
  extraReducers: (builder) => {
    builder.addCase('channels/removeChannel', (state, action) => {
      console.log('works', state.data, action);

      const channelId = action.payload;
      state.data = state.data.filter((message) => message.channelId !== channelId);
    });
  },
});

export const selectMessagesByChannelId = createSelector(
  (state) => state.messages.data,
  (_, channelId) => channelId,
  (messagesData, channelId) => messagesData.filter((msg) => msg.channelId === channelId),
);

export const { addMessage, addAllMessages, deleteChannelMessages } = messageSlice.actions;

export default messageSlice.reducer;
