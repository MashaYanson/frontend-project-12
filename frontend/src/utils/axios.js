import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, logOut } from '../store/userSlice';
import routes from '../routes';

const useInstance = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const instance = axios.create({
    baseURL: '/api/v1',
    timeout: 5000, // Время ожидания ответа в миллисекундах
  });
  const newInstance = async (request) => {
    const userData = JSON.parse(localStorage.getItem('user_data'));
    const authHeaders = userData
      ? { Authorization: `Bearer ${userData.token}` }
      : {};
    try {
      return await instance({
        ...request,
        headers: { ...authHeaders, ...request.headers },
      });
    } catch (error) {
      if (!error.isAxiosError) {
        // Ошибка сети или таймаут
        toast.error(t('errors.unknownError'), {
          position: 'top-right',
        });
        return Promise.reject(error);
      }
      const { status } = error.response;
      if (status === 401) {
        toast.error(t('errors.unauthorizedAccess'), {
          position: 'top-right',
        });
        localStorage.removeItem('user_data');
        dispatch(deleteUser());
        dispatch(logOut());
        navigate(routes.loginPagePath());
      }
      throw error;
    }
  };

  return newInstance;
};

export default useInstance;
