/* eslint-disable import/no-cycle */
import axios from 'axios';

const instance = axios.create({
  baseURL: '/api/v1',
  timeout: 5000, // Время ожидания ответа в миллисекундах
});

export default instance;
