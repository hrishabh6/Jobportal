import { isAuthenticated } from '@/lib/utils';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element }) => {
  const isUserAuthenticated = isAuthenticated();

  if (!isUserAuthenticated) {
    console.log('User not authenticated');
    return <Navigate to="/login" />;
  }

  return element;
};
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};

export default ProtectedRoute;
