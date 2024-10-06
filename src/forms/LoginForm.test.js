import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

const mockLogin = jest.fn();

test('renders LoginForm without crashing', () => {
  render(<LoginForm login={mockLogin} />);
});

test('renders LoginForm correctly', () => {
  const { container } = render(<LoginForm login={mockLogin} />);
  expect(container).toMatchSnapshot();
});

test('updates input values on change', () => {
  const { getByPlaceholderText } = render(<LoginForm login={mockLogin} />);

  const usernameInput = getByPlaceholderText('Username');
  const passwordInput = getByPlaceholderText('Password');

  fireEvent.change(usernameInput, { target: { value: 'testuser' } });
  fireEvent.change(passwordInput, { target: { value: 'password' } });

  expect(usernameInput.value).toBe('testuser');
  expect(passwordInput.value).toBe('password');
});

test('calls login function on submit', () => {
  const { getByText, getByPlaceholderText } = render(<LoginForm login={mockLogin} />);

  fireEvent.change(getByPlaceholderText('Username'), { target: { value: 'testuser' } });
  fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password' } });
  
  fireEvent.click(getByText('Login'));

  expect(mockLogin).toHaveBeenCalledWith({
    username: 'testuser',
    password: 'password'
  });
  expect(mockLogin).toHaveBeenCalledTimes(1);
});
