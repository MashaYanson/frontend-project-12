import axios from 'axios';
import { toast } from 'react-toastify';
import { i18n } from '../i18n';

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000, // Время ожидания ответа в миллисекундах
});

// Добавление interceptor для запросов
instance.interceptors.request.use((config) => {
  const userData = localStorage.getItem('user_data');
  if (userData) {
    const { token } = JSON.parse(userData);
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

// Добавление interceptor для ответов
instance.interceptors.response.use(
  (response) =>
    // eslint-disable-next-line implicit-arrow-linebreak
    response,
  (error) => {
    if (!error.response || !error.response?.status) {
      // Ошибка сети или таймаут
      toast.error('нет статуса', {
        position: 'top-right',
      });
      return Promise.reject(error);
    }
    // Ошибки ответа сервера
    const { status } = error.response;
    if (status === 401) {
      toast.error(i18n.t('errors.unauthorizedAccess'), {
        position: 'top-right',
      });
    } else if (status === 403) {
      toast.error(i18n.t('errors.forbidden'), {
        position: 'top-right',
      });
    } else if (status === 404) {
      toast.error(i18n.t('errors.resourceNotFound'), {
        position: 'top-right',
      });
    } else {
      toast.error(i18n.t('errors.errorOccurred'), {
        position: 'top-right',
      });
    }

    console.log(error);
    return Promise.reject(error);
  },
);

export default instance;
