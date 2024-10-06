import React from 'react';
import { render } from '@testing-library/react';
import ProfileForm from './ProfileForm';
import UserContext from '../UserContext';

// Mock user data
const currentUser = {
  username: 'testuser',
  firstName: 'Test',
  lastName: 'User',
  email: 'testuser@gmail.com',
};

// Mock deleteUser function
const deleteUser = jest.fn();

// Mock context for testing
const Wrapper = ({ children }) => (
  <UserContext.Provider value={{ currentUser }}>{children}</UserContext.Provider>
);

// Smoke test to ensure component renders without crashing
it('renders without crashing', () => {
  render(<ProfileForm deleteUser={deleteUser} />, { wrapper: Wrapper });
});

// Snapshot test to capture the rendered output of the component
it('matches snapshot', () => {
  const { asFragment } = render(<ProfileForm deleteUser={deleteUser} />, { wrapper: Wrapper });
  expect(asFragment()).toMatchSnapshot();
});
