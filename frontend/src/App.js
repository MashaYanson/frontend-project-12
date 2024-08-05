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
    element: <PageLayout />,
    children: [
      {
        path: '',
        element: <PrivateRoute><ChatPage /></PrivateRoute>,
      },
      {
        path: routes.loginPagePath(),
        element: <LoginPage />,
      },
      {
        path: routes.notFoundPage(),
        element: <NotFoundPage />,
      },
      {
        path: routes.signupPagePath(),
        element: <SignupForm />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
]);

const App = () => {
  console.log('');
  return (
    <RouterProvider router={router} />
  );
};
export default App;
