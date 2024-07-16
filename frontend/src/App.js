import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import ChatPage from './components/Pages/ChatPage';
import LoginPage from './components/Pages/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import routes from './routes';
import SignupForm from './components/Pages/SignupPage';
import PageLayout from './components/PageLayout';
import instance from './utils/axios';
import PrivateRoute from './components/PrivateRoute';
import { logIn } from './store/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <PrivateRoute><PageLayout authrized><ChatPage /></PageLayout></PrivateRoute>,
  },
  {
    path: routes.loginPagePath(),
    element: <PageLayout><LoginPage /></PageLayout>,
  },
  {
    path: routes.notFoundPage(),
    element: <PageLayout><NotFoundPage /></PageLayout>,
  },
  {
    path: routes.signupPagePath(),
    element: <PageLayout><SignupForm /></PageLayout>,
  },
  {
    path: '*',
    element: <PageLayout><NotFoundPage /></PageLayout>,
  },
]);

const App = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [init, setInit] = useState(false);
  useEffect(() => {
    instance.interceptors.request.use((config) => {
      const userData = localStorage.getItem('user_data');
      if (userData) {
        const { token } = JSON.parse(userData);
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    }, (error) => Promise.reject(error));
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
          toast.error(t('errors.unauthorizedAccess'), {
            position: 'top-right',
          });
        } else if (status === 403) {
          toast.error(t('errors.forbidden'), {
            position: 'top-right',
          });
        } else if (status === 404) {
          toast.error(t('errors.resourceNotFound'), {
            position: 'top-right',
          });
        } else {
          toast.error(t('errors.errorOccurred'), {
            position: 'top-right',
          });
        }
        return Promise.reject(error);
      },
    );
  }, [t]);
  useEffect(() => {
    const userString = localStorage.getItem('user_data');
    if (userString) {
      const userData = JSON.parse(userString);
      dispatch(logIn(userData));
      setInit(true);
    }
  }, [dispatch]);
  return (
    init ? <RouterProvider router={router} /> : null
  );
};

export default App;
