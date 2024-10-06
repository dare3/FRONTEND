import React, { useState, useEffect } from 'react';
import JoblyApi from '../common/api';
import SearchBar from '../forms/SearchBar';
import JobCardList from './JobCardList';
import LoadingSpinner from '../common/LoadingSpinner';

/** Show list of all jobs.
 *
 * On mount, loads jobs from API.
 * Re-loads filtered jobs on submit from search form.
 *
 * JobList -> JobCardList -> JobCard
 *
 * Routed at /jobs
 */

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.debug('JobList useEffect getJobsOnMount');
    loadJobs();
  }, []);

  /** Load jobs from API. */
  async function loadJobs(title) {
    setIsLoading(true);
    try {
      const result = await JoblyApi.getJobs(title);
      setJobs(result);
    } catch (error) {
      console.error("Error loading jobs: ", error);
      // You can set an error state here to display an error message if needed
    } finally {
      setIsLoading(false);
    }
  }

  /** Triggered by search form submit; reloads jobs. */
  const search = (title) => {
    loadJobs(title);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="JobList col-md-8 offset-md-2">
      <SearchBar searchFor={search} />
      {jobs.length > 0 ? (
        <JobCardList jobs={jobs} />
      ) : (
        <p className="message">
          There are no openings at this time. Please check back later!
        </p>
      )}
    </div>
  );
};

export default JobList;
