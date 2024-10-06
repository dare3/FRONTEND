import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';

import UserContext from '../UserContext';

/** "Higher-Order Component" for private routes.
 *
 * In routing component, use these instead of <Route ...>. This component
 * will check if there is a valid current user and only continues to the
 * route if so. If no user is present, redirects to login form.
 */

function ProtectedRoute({ children, ...rest }) {
  const { currentUser } = useContext(UserContext);

  console.debug(
    'ProtectedRoute',
    'rest=',
    rest,
    'currentUser=',
    currentUser
  );

  return (
    <Route {...rest} element={currentUser ? children : <Navigate to="/login" replace />} />
  );
}

export default ProtectedRoute;
