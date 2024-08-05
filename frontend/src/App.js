import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Routes,
  Route, BrowserRouter,
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

const App = () => {
  console.log('');
  return (
    <BrowserRouter>
      <PageLayout>
        <Routes>
          <Route path={routes.notFoundPage()} element={<NotFoundPage />} />
          <Route path={routes.signupPagePath()} element={<SignupForm />} />
          <Route path={routes.loginPagePath()} element={<LoginPage />} />
          <Route path="/" element={<PrivateRoute><ChatPage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageLayout>
    </BrowserRouter>

  );
};
export default App;
