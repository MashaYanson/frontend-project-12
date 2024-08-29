// import { configureStore } from '@reduxjs/toolkit';
// import userReducer from './userSlice';
// import channelReducer from './channelSlice';
// import messagesReducer, { deleteChannelMessages } from './messageSlice';
//
// const channelMessagesMiddleware = (store) => (next) => (action) => {
//   if (action.type === 'channels/removeChannel') {
//     store.dispatch(deleteChannelMessages({ channelId: action.payload }));
//   }
//   return next(action);
// };
// const createStore = () => configureStore({
//   reducer: {
//     user: userReducer,
//     channels: channelReducer,
//     messages: messagesReducer,
//   },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(channelMessagesMiddleware),
//
// });
// export default createStore;
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
