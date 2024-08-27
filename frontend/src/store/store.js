import { configureStore } from '@reduxjs/toolkit';
import { actionsReducer as messagesSlice } from '@reduxjs/toolkit/src/tests/utils/helpers';
import userReducer from './userSlice';
import channelReducer from './channelSlice';
import messagesReducer from './messageSlice';

const channelMessagesMiddleware = (store) => (next) => (action) => {
  if (action.type === 'channels/removeChannel') {
    store.dispatch(messagesSlice.actions.deleteChannelMessages({ channelId: action.payload }));
  }
  return next(action);
};
const createStore = () => configureStore({
  reducer: {
    user: userReducer,
    channels: channelReducer,
    messages: messagesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelMessagesMiddleware),

});
export default createStore;
