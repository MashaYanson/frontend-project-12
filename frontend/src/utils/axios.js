import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1', // Замените на вашу базовую URL
  timeout: 5000, // Время ожидания ответа в миллисекундах
});

// Добавление interceptor для запросов
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
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
  (error) =>
  // Здесь можно обрабатывать ошибки, например, обновлять токен при получении 401 ошибки
  // eslint-disable-next-line implicit-arrow-linebreak
    Promise.reject(error),
);

// Теперь вы можете делать запросы через этот экземпляр

export default instance;
