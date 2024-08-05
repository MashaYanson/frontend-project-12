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

  const newInstance = async (method, url, data) => {
    const userData = localStorage.getItem('user_data');
    const config = {};
    if (userData) {
      const { token } = JSON.parse(userData);
      config.headers = { Authorization: `Bearer ${token}` };
    }
    try {
      const response = await instance({
        method,
        url,
        data,
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
      // else if (status === 403) {
      //   toast.error(t('errors.forbidden'), {
      //     position: 'top-right',
      //   });
      // } else if (status === 404) {
      //   toast.error(t('errors.resourceNotFound'), {
      //     position: 'top-right',
      //   });
      // } else {
      //   toast.error(t('errors.errorOccurred'), {
      //     position: 'top-right',
      //   });
      // }
      throw error;
    }
  };

  return newInstance;
};

// export const newInstance = (type, url, data) => {
//   const userData = localStorage.getItem('user_data');
//   const config = {};
//   if (userData) {
//     const { token } = JSON.parse(userData);
//     // eslint-disable-next-line no-param-reassign
//     config.headers = { Authorization: `Bearer ${token}` };
//   }
//   switch (type) {
//     case 'post':
//       return instance.post(url, data, config);
//     case 'patch':
//       return instance.patch(url, data, config);
//     case 'get':
//       return instance.get(url, config);
//     case 'delete':
//       return instance.delete(url, config);
//     default:
//       return instance.get(url, config);
//   }
// };
export default instance;
