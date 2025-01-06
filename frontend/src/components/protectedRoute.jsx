import { isAuthenticated } from '@/lib/utils';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element }) => {
  const isUserAuthenticated = isAuthenticated();

  if (!isUserAuthenticated) {
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
