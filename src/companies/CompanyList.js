import React, { useState, useEffect, useRef } from 'react'; // Import useRef
import SearchBar from '../forms/SearchBar';
import JoblyApi from '../common/api';
import CompanyCard from './CompanyCard';
import LoadingSpinner from '../common/LoadingSpinner';

/** Show list of all companies.
 *
 * On mount, loads companies from API.
 * Re-loads filtered companies on submit from search form.
 *
 * Routes -> { CompanyCard, SearchForm }
 *
 * Routed to at /companies
 */

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isMounted = useRef(true); // Create a ref to track mounted status

  useEffect(() => {
    isMounted.current = true; // Set to true when component mounts

    async function getCompaniesOnMount() {
      console.debug('CompanyList useEffect getCompaniesOnMount');
      await search();
    }

    getCompaniesOnMount();

    return () => {
      isMounted.current = false; // Cleanup function to mark as unmounted
    };
  }, []);

  /** Triggered by search form submit; reloads companies. */
  async function search(name) {
    try {
      let companies = await JoblyApi.getCompanies(name);
      if (isMounted.current) { // Check if still mounted
        setCompanies(companies);
      }
    } catch (error) {
      console.error("Failed to fetch companies:", error);
      // Optionally, set an error state here
    } finally {
      if (isMounted.current) {
        setIsLoading(false);
      }
    }
  }

  if (isLoading) {
    return <LoadingSpinner message="Loading companies..." />;
  }

  return (
    <div className="CompanyList col-md-8 offset-md-2">
      <SearchBar searchFor={search} />
      {companies.length ? (
        <div className="CompanyList-list">
          {companies.map(c => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))}
        </div>
      ) : (
        <p className="message">Sorry, no results were found!</p>
      )}
    </div>
  );
};

export default CompanyList;
