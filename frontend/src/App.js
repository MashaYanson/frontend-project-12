import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import routes from './routes';
import { addUser } from './store/userSlice';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ChatPage />,
  },
  {
    path: routes.loginPagePath(),
    element: <LoginPage />,
  },
  {
    path: routes.notFoundPage(),
    element: <NotFoundPage />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.username);
  useEffect(() => {
    const userString = localStorage.getItem('user_data');
    if (!userName && userString) {
      const userData = JSON.parse(userString);
      dispatch(addUser((userData)));
    }
  }, []);
  return (
    <RouterProvider router={router} />
  );
};

export default App;
