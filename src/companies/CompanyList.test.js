import React from 'react';
import { render, screen } from '@testing-library/react';
import CompanyList from './CompanyList';
import JoblyApi from '../common/api';

// Mocking JoblyApi.getCompanies
jest.mock('../common/api');

describe('CompanyList', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mocks before each test
  });

  test('renders without errors', () => {
    JoblyApi.getCompanies.mockResolvedValue([]); // Mock API response
    render(<CompanyList />);
  });

  test('matches snapshot', () => {
    JoblyApi.getCompanies.mockResolvedValue([]); // Mock API response
    const { asFragment } = render(<CompanyList />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('displays loading spinner initially', () => {
    JoblyApi.getCompanies.mockImplementation(() => new Promise(() => {})); // Mocking a pending promise
    render(<CompanyList />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument(); // Check for loading spinner text
  });

  test('displays no results message when no companies are found', async () => {
    JoblyApi.getCompanies.mockResolvedValue([]); // Mock API response
    render(<CompanyList />);
    
    // Wait for companies to be loaded
    expect(await screen.findByText(/sorry, no results were found!/i)).toBeInTheDocument();
  });

  test('displays companies when fetched', async () => {
    const mockCompanies = [
      { handle: 'company1', name: 'Company One', description: 'Description One', logoUrl: '' },
      { handle: 'company2', name: 'Company Two', description: 'Description Two', logoUrl: '' },
    ];
    JoblyApi.getCompanies.mockResolvedValue(mockCompanies); // Mock API response

    render(<CompanyList />);
    
    // Wait for companies to be loaded
    expect(await screen.findByText(/company one/i)).toBeInTheDocument();
    expect(await screen.findByText(/company two/i)).toBeInTheDocument();
  });
});
