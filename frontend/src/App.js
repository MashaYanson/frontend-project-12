import 'bootstrap/dist/css/bootstrap.min.css';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import React from 'react';
import ChatPage from './components/ChatPage';
import LoginPage from './components/LoginPage';
import NotFoundPage from './components/NotFoundPage';
import routes from './routes';

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

const App = () => (
  <RouterProvider router={router} />
);

export default App;
