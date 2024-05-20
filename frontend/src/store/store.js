import { configureStore } from '@reduxjs/toolkit';
import userReduser from './userSlice';
import channelReduser from './channelSlice';
import messagesReduser from './messageSlice';

const store = configureStore({
  reducer: {
    user: userReduser,
    channels: channelReduser,
    messages: messagesReduser,
  },
});
export default store;
