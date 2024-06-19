import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import translationRU from './locales/ru.js';
import translationENG from './locales/eng.js';

const resources = {
  en: {
    translation: translationENG,
  },
  ru: {
    translation: translationRU,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'ru',
    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
