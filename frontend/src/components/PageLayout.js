import { Container, Navbar, Stack } from 'react-bootstrap';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { deleteUser } from '../store/userSlice';
import routes from '../routes';

const PageLayout = ({ children, authrized }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('user_data');
    dispatch(deleteUser());
    navigate(routes.loginPagePath());
  };
  return (
    <Stack className="h-100">
      <Navbar className="bg-body-tertiary p-2 shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <Container>
          <Navbar.Brand href="/">Yanson Chat</Navbar.Brand>
          {authrized && (
          <button
            onClick={handleLogOut}
            type="button"
            className="btn btn-primary"
          >
            Выйти
          </button>
          )}
        </Container>
      </Navbar>
      {children}
    </Stack>
  );
};
export default PageLayout;
