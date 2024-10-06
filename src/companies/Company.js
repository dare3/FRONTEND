import React from 'react';

/**
 * Company component.
 *
 * Displays details of a company.
 *
 * Props:
 * - name: Company name
 * - description: Brief description of the company
 * - website: Company's website URL
 */
const Company = ({ name, description, website }) => {
  return (
    <div className="Company">
      <h1>{name}</h1>
      <p>{description}</p>
      {website && (
        <p>
          <a href={website} target="_blank" rel="noopener noreferrer">
            Visit Website
          </a>
        </p>
      )}
    </div>
  );
};

export default Company;
