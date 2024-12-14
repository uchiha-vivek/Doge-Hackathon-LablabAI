import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../config/firebase'; // import the auth object from firebase

const PrivateRoute = ({ element, ...rest }) => {
  // Check if the user is logged in
  const isAuthenticated = auth.currentUser;

  // Return the correct element based on authentication status
  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
