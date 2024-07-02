/* eslint-disable import/no-cycle */

import i18next from 'i18next';
import { I18nextProvider, initReactI18next } from 'react-i18next';
import { Provider } from 'react-redux';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { rollbarConfig } from './rollbarConfig';
import translationRU from './locales/ru.js';
import translationENG from './locales/eng.js';
import store from './store/store';
import App from './App';

const resources = {
  en: {
    translation: translationENG,
  },
  ru: {
    translation: translationRU,
  },
};
export const i18n = i18next.createInstance();

const init = async () => {
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
          <Provider store={store}>
            <App />
            <ToastContainer />
          </Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
