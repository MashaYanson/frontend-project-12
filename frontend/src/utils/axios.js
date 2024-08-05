/* eslint-disable import/no-cycle */
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000, // Время ожидания ответа в миллисекундах
});

export const useInstance = () => {
  const { t } = useTranslation();

  const newInstance = async (request) => {
    const userData = localStorage.getItem('user_data');
    const config = request.config ? request.config : {};
    if (userData) {
      const { token } = JSON.parse(userData);
      config.headers = { Authorization: `Bearer ${token}` };
    }
    try {
      const response = await instance({
        method: request.method,
        url: request.url,
        data: request.data,
        ...config,
      });
      return response;
    } catch (error) {
      if (!error.response || !error.response?.status) {
        // Ошибка сети или таймаут
        toast.error('нет статуса', {
          position: 'top-right',
        });
        return Promise.reject(error);
      }
      const { status } = error.response;
      if (status === 401) {
        toast.error(t('errors.unauthorizedAccess'), {
          position: 'top-right',
        });
      }

      throw error;
    }
  };

  return newInstance;
};

export default instance;
