import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import CompanyDetail from './CompanyDetail';
import JoblyApi from '../common/api'; // Import the API
import { act } from 'react-dom/test-utils';

// Mock the JoblyApi.getCompany method
jest.mock('../common/api');

describe('CompanyDetail', () => {
  beforeEach(() => {
    // Reset the mock before each test
    JoblyApi.getCompany.mockClear();
  });

  it('renders without errors', () => {
    // Mock implementation for the API call
    JoblyApi.getCompany.mockResolvedValue({
      name: 'Test Company',
      logoUrl: 'http://example.com/logo.png',
      description: 'This is a test company.',
      jobs: []
    });

    render(
      <MemoryRouter initialEntries={['/companies/test-company']}>
        <Route path="/companies/:handle">
          <CompanyDetail />
        </Route>
      </MemoryRouter>
    );
  });

  it('matches snapshot', async () => {
    // Mock implementation for the API call
    JoblyApi.getCompany.mockResolvedValue({
      name: 'Test Company',
      logoUrl: 'http://example.com/logo.png',
      description: 'This is a test company.',
      jobs: []
    });

    let component;
    await act(async () => {
      component = render(
        <MemoryRouter initialEntries={['/companies/test-company']}>
          <Route path="/companies/:handle">
            <CompanyDetail />
          </Route>
        </MemoryRouter>
      );
    });

    expect(component.asFragment()).toMatchSnapshot();
  });
});
