import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
  redirect,
} from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ChatPage from './components/Pages/ChatPage';
import LoginPage from './components/Pages/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import routes from './routes';
import { addUser } from './store/userSlice';
import SignupForm from './components/Pages/SignupPage';
import PageLayout from './components/PageLayout';

const protetedLoader = () => {
  const userString = localStorage.getItem('user_data');
  if (userString) {
    return null;
  }
  return redirect(routes.loginPagePath());
};
const router = createBrowserRouter([
  {
    path: '/',
    element: <PageLayout authrized><ChatPage /></PageLayout>,
    loader: protetedLoader,
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
