import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import React from 'react';
import ChatPage from './components/Pages/ChatPage';
import LoginPage from './components/Pages/LoginPage';
import NotFoundPage from './components/Pages/NotFoundPage';
import routes from './routes';
import SignupForm from './components/Pages/SignupPage';
import PageLayout from './components/PageLayout';
import PrivateRoute from './components/PrivateRoute';

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
  console.log('');
  return (
    <RouterProvider router={router} />
  );
};
export default App;
