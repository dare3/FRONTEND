import React from 'react';
import './LoadingSpinner.css';

/** Loading message used by components that fetch API data.
 *
 * Props:
 * - message: Custom loading message (default is "Loading...").
 */

const LoadingSpinner = ({ message = 'Loading...' }) => (
  <div className="LoadingSpinner" aria-live="polite">
    {message}
  </div>
);

export default LoadingSpinner;
