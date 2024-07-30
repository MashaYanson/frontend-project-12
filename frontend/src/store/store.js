import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import channelReducer from './channelSlice';
import messagesReducer from './messageSlice';

const createStore = () => configureStore({
  reducer: {
    user: userReducer,
    channels: channelReducer,
    messages: messagesReducer,
  },
});
export default createStore;
