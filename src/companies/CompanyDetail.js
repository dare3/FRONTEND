import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import JoblyApi from '../common/api';
import JobCardList from '../jobs/JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';

/** Show details on a company
 * Renders information about company, along with the jobs at that company.
 *
 * Routed at /companies/:handle
 *
 * Routes -> CompanyDetail -> JobCardList
 */

const CompanyDetail = () => {
  const { handle } = useParams();
  console.debug('CompanyDetail', 'handle=', handle);

  const [company, setCompany] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCompany() {
      try {
        const result = await JoblyApi.getCompany(handle);
        setCompany(result);
      } catch (error) {
        console.error("Error fetching company data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    getCompany();
  }, [handle]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="CompanyDetail col-md-8 offset-md-2">
      <h2>
        {company.name}
        {company.logoUrl && (
          <img
            src={company.logoUrl}
            alt={`${company.name} logo`}
            className="float-right ml-5"
            style={{ width: '4em' }}
          />
        )}
      </h2>
      <p>{company.description}</p>
      {company.jobs && company.jobs.length > 0 ? (
        <JobCardList jobs={company.jobs} />
      ) : (
        <p>No jobs available for this company.</p>
      )}
    </div>
  );
};

export default CompanyDetail;
