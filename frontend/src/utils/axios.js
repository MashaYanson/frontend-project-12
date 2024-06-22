import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1', // Замените на вашу базовую URL
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
    // Здесь можно добавить дополнительную логику обработки ответов
    // eslint-disable-next-line implicit-arrow-linebreak
    response,
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
  // Здесь можно обрабатывать ошибки, например, обновлять токен при получении 401 ошибки
  // eslint-disable-next-line implicit-arrow-linebreak

);

// Теперь вы можете делать запросы через этот экземпляр

export default instance;
