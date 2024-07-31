import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
// import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import rollbarConfig from './rollbarConfig';
import translationRU from './locales/ru.js';
import translationENG from './locales/eng.js';
import App from './App';
import DataContext from './components/DataContext';
import createStore from './store/store';
import { addMessage, deleteChannelMessages } from './store/messageSlice';
import {
  addChannel, editChannel, removeChannel,
} from './store/channelSlice';

const resources = {
  en: {
    translation: translationENG,
  },
  ru: {
    translation: translationRU,
  },
};

const init = async () => {
  const store = createStore();
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  // filter.clearList();
  // filter.add(filter.getDictionary('ru'));
  // filter.add(filter.getDictionary('en'));
  // filter.add('boobs');

  const socket = io();

  // instance.get('/channels')
  //   .then((response) => {
  //     store.dispatch(updateChannels(response.data));
  //   });
  //
  // instance.get('/messages')
  //   .then((response) => {
  //     store.dispatch(addAllMessages(response.data));
  //   });

  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });

  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload.id));
    store.dispatch(deleteChannelMessages(payload.id));
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(editChannel(payload));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <DataContext.Provider value={{ socket }}>
            <Provider store={store}>
              <App />
              <ToastContainer />
            </Provider>
          </DataContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
