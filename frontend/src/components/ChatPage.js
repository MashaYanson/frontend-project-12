import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import routes from '../routes';
import instance from '../utils/axios';

const ChatPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate(routes.loginPagePath());
    } else {
      instance.get('/channels', {
      }).then((response) => {
        setData(response.data);
      });
    }
  }, []);
  return (
    <div>
      <h1>Главная страница</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      {/* Добавьте вашу основную логику приложения здесь */}
    </div>
  );
};

export default ChatPage;
