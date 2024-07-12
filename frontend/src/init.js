import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import filter from 'leo-profanity';
import { io } from 'socket.io-client';
import rollbarConfig from './rollbarConfig';
import translationRU from './locales/ru.js';
import translationENG from './locales/eng.js';
import store from './store/store';
import App from './App';
import InterceptorsProvider from './components/InterceptorsProvider';
import DataContext from './components/DataContext';

filter.clearList();
filter.add(filter.getDictionary('ru'));
filter.add(filter.getDictionary('en'));
filter.add('boobs');

const socket = io();

const resources = {
  en: {
    translation: translationENG,
  },
  ru: {
    translation: translationRU,
  },
};

const init = async () => {
  const i18n = i18next.createInstance();

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      fallbackLng: 'ru',
    });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <I18nextProvider i18n={i18n}>
          <DataContext.Provider value={{ filter, socket }}>
            <Provider store={store}>
              <InterceptorsProvider>
                <App />
                <ToastContainer />
              </InterceptorsProvider>
            </Provider>
          </DataContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
