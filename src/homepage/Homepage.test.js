import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserContext from '../UserContext';
import Homepage from './Homepage';

describe('Homepage', () => {
  test('renders welcome message', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: null }}>
          <Homepage />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const welcomeMessage = screen.getByText(/Find and apply for the best jobs with Jobly/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders login and signup buttons when user is not logged in', () => {
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser: null }}>
          <Homepage />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const loginButton = screen.getByRole('button', { name: /login/i });
    expect(loginButton).toBeInTheDocument();

    const signupButton = screen.getByRole('button', { name: /sign up/i });
    expect(signupButton).toBeInTheDocument();
  });

  test('renders welcome message with user name when user is logged in', () => {
    const currentUser = { username: 'testuser', firstName: 'Test', lastName: 'User' };
    render(
      <BrowserRouter>
        <UserContext.Provider value={{ currentUser }}>
          <Homepage />
        </UserContext.Provider>
      </BrowserRouter>
    );

    const welcomeMessage = screen.getByText(/Welcome back, Test!/i);
    expect(welcomeMessage).toBeInTheDocument();
  });
});
