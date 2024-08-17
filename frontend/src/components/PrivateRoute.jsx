import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/userSlice';
import routes from '../routes';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const location = useLocation();

  return (
    isLoggedIn ? children : <Navigate to={routes.loginPagePath()} state={{ from: location }} />
  );
};

export default PrivateRoute;
