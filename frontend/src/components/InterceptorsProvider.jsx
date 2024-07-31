// import { useEffect, useState } from 'react';
// import { useTranslation } from 'react-i18next';
// import { toast } from 'react-toastify';
// import instance from '../utils/axios';
//
// const InterceptorsProvider = ({ children }) => {
//   const [init, setInit] = useState(false);
//   const { t } = useTranslation();
//   useEffect(() => {
//     instance.interceptors.request.use((config) => {
//       const userData = localStorage.getItem('user_data');
//       if (userData) {
//         const { token } = JSON.parse(userData);
//         // eslint-disable-next-line no-param-reassign
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     }, (error) => Promise.reject(error));
//     instance.interceptors.response.use(
//       (response) => response,
//       (error) => {
//         if (!error.response || !error.response?.status) {
//           // Ошибка сети или таймаут
//           toast.error('нет статуса', {
//             position: 'top-right',
//           });
//           return Promise.reject(error);
//         }
//         // Ошибки ответа сервера
//         const { status } = error.response;
//         if (status === 401) {
//           toast.error(t('errors.unauthorizedAccess'), {
//             position: 'top-right',
//           });
//         } else if (status === 403) {
//           toast.error(t('errors.forbidden'), {
//             position: 'top-right',
//           });
//         } else if (status === 404) {
//           toast.error(t('errors.resourceNotFound'), {
//             position: 'top-right',
//           });
//         } else {
//           toast.error(t('errors.errorOccurred'), {
//             position: 'top-right',
//           });
//         }
//         return Promise.reject(error);
//       },
//     );
//     setInit(true);
//   }, [t]);
//   return init ? children : null;
// };
//
// export default InterceptorsProvider;
