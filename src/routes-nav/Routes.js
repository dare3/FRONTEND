import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Homepage from '../homepage/Homepage';
import CompanyList from '../companies/CompanyList';
import CompanyDetail from '../companies/CompanyDetail';
import JobList from '../jobs/JobList';
import LoginForm from '../forms/LoginForm';
import SignUpForm from '../forms/SignUpForm';
import ProfileForm from '../forms/ProfileForm';
import Protected from './ProtectedRoute';

/** Site-wide routes.
 *
 * Parts of the site are only visitable when logged in. Those routes are
 * wrapped by <Protected>, which is an authorization component.
 *
 * Visiting a non-existent route redirects to the homepage.
 */

const AppRoutes = ({ login, signup, deleteUser }) => {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />

      <Route path="/login" element={<LoginForm login={login} />} />

      <Route path="/signup" element={<SignUpForm signup={signup} />} />

      <Route 
        path="/companies" 
        element={
          <Protected>
            <CompanyList />
          </Protected>
        } 
      />

      <Route 
        path="/companies/:handle" 
        element={
          <Protected>
            <CompanyDetail />
          </Protected>
        } 
      />

      <Route 
        path="/jobs" 
        element={
          <Protected>
            <JobList />
          </Protected>
        } 
      />

      <Route 
        path="/profile" 
        element={
          <Protected>
            <ProfileForm deleteUser={deleteUser} />
          </Protected>
        } 
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
