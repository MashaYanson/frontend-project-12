import { createSlice } from '@reduxjs/toolkit';

const initialState = { data: [] };

export const channelSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    updateChannels: (state, action) => {
      state.data = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateChannels } = channelSlice.actions;

export default channelSlice.reducer;
