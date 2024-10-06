import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SignUpForm from './SignUpForm';

// Mock signup function
const mockSignup = jest.fn();

// Wrapper to provide the necessary context
const Wrapper = ({ children }) => (
  <div>{children}</div>
);

// Test: renders SignupForm without crashing
test('renders SignupForm without crashing', () => {
  render(
    <Wrapper>
      <SignUpForm signup={mockSignup} />
    </Wrapper>
  );
});

// Test: renders SignupForm correctly
test('renders SignupForm correctly', () => {
  const { container } = render(
    <Wrapper>
      <SignUpForm signup={mockSignup} />
    </Wrapper>
  );
  expect(container).toMatchSnapshot();
});

// Test: form submission calls the signup function
test('calls signup function on form submission', () => {
  const { getByPlaceholderText, getByText } = render(
    <Wrapper>
      <SignUpForm signup={mockSignup} />
    </Wrapper>
  );

  fireEvent.change(getByPlaceholderText('Username'), {
    target: { value: 'testuser' },
  });
  fireEvent.change(getByPlaceholderText('Password'), {
    target: { value: 'password123' },
  });
  fireEvent.change(getByPlaceholderText('First Name'), {
    target: { value: 'Test' },
  });
  fireEvent.change(getByPlaceholderText('Last Name'), {
    target: { value: 'User' },
  });
  fireEvent.change(getByPlaceholderText('Email'), {
    target: { value: 'testuser@example.com' },
  });

  fireEvent.click(getByText('Sign Up'));

  expect(mockSignup).toHaveBeenCalledTimes(1);
  expect(mockSignup).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
  });
});
