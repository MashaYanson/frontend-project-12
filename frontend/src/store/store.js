import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import channelReduser from './channelSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    channels: channelReduser,
  },
});
export default store;
