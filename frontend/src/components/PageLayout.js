import { Container, Navbar, Stack } from 'react-bootstrap';
import React, { useTransition } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser, logOut } from '../store/userSlice';
import routes from '../routes';

const PageLayout = ({ children }) => {
  const t = useTransition();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const handleLogOut = () => {
    localStorage.removeItem('user_data');
    dispatch(deleteUser());
    dispatch(logOut());
    navigate(routes.loginPagePath());
  };
  return (
    <Stack className="h-100">
      <Navbar className="bg-body-tertiary p-2 shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand href="/">{t('chatName')}</Navbar.Brand>
          {isLoggedIn && (
          <button
            onClick={handleLogOut}
            type="button"
            className="btn btn-primary"
          >
            {t('logOut')}
          </button>
          )}
        </Container>
      </Navbar>
      {children}
    </Stack>
  );
};
export default PageLayout;
