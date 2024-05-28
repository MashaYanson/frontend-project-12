import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [], channelId: '1' };

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateChannels: (state, action) => {
      state.data = action.payload;
    },
    addChannel: (state, action) => {
      const isChannelExist = state.data.some((item) => item.id === action.payload.id);
      if (!isChannelExist) {
        state.data.push(action.payload);
      }
    },
    removeChannel: (state, action) => {
      state.data = state.data.filter((channel) => channel.id !== action.payload);
      if (state.channelId === action.payload) {
        state.channelId = '1';
      }
    },
    setChannel: (state, action) => {
      state.channelId = action.payload;
    },
  },
});

export const {
  updateChannels, addChannel, removeChannel, setChannel,
} = channelSlice.actions;

export default channelSlice.reducer;
