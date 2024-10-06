import React, { useState } from 'react';
import { Input, Button } from 'reactstrap';

/** Search widget.
 *
 * Appears on CompanyList and JobList to filter results.
 * 
 * This component renders the search form and calls the `searchFor` 
 * function prop that runs in a parent to perform the search.
 *
 * { CompanyList, JobList } -> SearchForm
 */

const SearchBar = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState('');

  /** Update searchTerm state when input changes */
  const handleChange = evt => {
    setSearchTerm(evt.target.value);
  };

  /** Handle form submission and notify parent to filter results */
  const handleSubmit = evt => {
    evt.preventDefault();
    // Call searchFor with the trimmed search term, or undefined if empty
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(''); // Clear the search term after submission
  };

  return (
    <div className="SearchForm mb-4">
      <form onSubmit={handleSubmit}>
        <Input
          className="form-control"
          name="searchTerm"
          type="search"
          placeholder="Enter search term..."
          value={searchTerm}
          onChange={handleChange}
        />
        <Button type="submit" color="primary" className="mt-3">
          Search
        </Button>
      </form>
    </div>
  );
};

export default SearchBar;
