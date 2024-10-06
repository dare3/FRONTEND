import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import JobCard from './JobCard';
import JoblyApi from '../common/api';
import LoadingSpinner from '../common/LoadingSpinner';

/** Shows list of jobs that currentUser has applied to
 *
 * Routes -> ProfileForm -> JobsAppliedTo
 *
 */

const JobsAppliedTo = () => {
  const { currentUser } = useContext(UserContext);
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getAppliedJobs() {
      try {
        const appData = await Promise.all(
          currentUser.applications.map(id => JoblyApi.getJobsByID(id))
        );
        setJobs(appData);
      } catch (err) {
        console.error("Error fetching applied jobs: ", err);
        setError("Failed to load applied jobs. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    }

    if (currentUser.applications.length) {
      getAppliedJobs();
    } else {
      setIsLoading(false); // If no applications, set loading to false
    }
  }, [currentUser.applications]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      {jobs.length > 0 ? (
        jobs.map(job => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            salary={job.salary}
            equity={job.equity}
            companyName={job.companyName}
          />
        ))
      ) : (
        <p>
          You have not applied to any jobs yet! <a href="/jobs">Find some</a>
        </p>
      )}
    </div>
  );
};

export default JobsAppliedTo;
