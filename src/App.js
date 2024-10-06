import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import useLocalStorage from './common/useLocalStorage';
import jwt from 'jsonwebtoken';
import 'bootstrap/dist/css/bootstrap.min.css';

import JoblyApi from './common/api';
import NavBar from './routes-nav/NavBar';
import Routes from './routes-nav/Routes';
import UserContext from './UserContext';
import LoadingSpinner from './common/LoadingSpinner';

// Key name for storing token in localStorage for "remember me" re-login
export const TOKEN_STORAGE_ID = 'jobly-token';

/** Jobly application.
 *
 * - infoLoaded: has user data been pulled from API?
 *   (this manages spinner for "loading...")
 *
 * - currentUser: user obj from API. This becomes the canonical way to tell
 *   if someone is logged in. This is passed around via context throughout app.
 *
 * - token: for logged in users, this is their authentication JWT.
 *   Is required to be set for most API calls. This is initially read from
 *   localStorage and synced to there via the useLocalStorage hook.
 *
 * App -> Routes
 */
const App = () => {
  // State to manage whether the app has finished loading user information
  const [infoLoaded, setInfoLoaded] = useState(false);
  
  // State to store the set of job application IDs for the current user
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  
  // State to hold the current logged-in user information (null if not logged in)
  const [currentUser, setCurrentUser] = useState(null);
  
  // Custom hook to manage token stored in localStorage
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    'App',
    'infoLoaded=',
    infoLoaded,
    'applicationIds=',
    applicationIds,
    'currentUser=',
    currentUser,
    'token=',
    token
  );

  /** useEffect: Runs when token changes.
   * 
   * If a valid token is present, attempts to load user data from the API
   * using the decoded token to fetch the current user's profile.
   * The token is set to the API class to ensure it can be used in API requests.
   */
  useEffect(() => {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username, exp } = jwt.decode(token);

          // Check if the token has expired; if so, log the user out by resetting token
          if (Date.now() >= exp * 1000) {
            setToken(null);
            return;
          }

          // Set the token to be used by the API
          JoblyApi.token = token;

          // Fetch the user's data from the API
          let currentUser = await JoblyApi.getCurrentUser(username);

          // Set the current user's application IDs
          setApplicationIds(new Set(currentUser.applications));

          // Set the current user object
          setCurrentUser(currentUser);
        } catch (err) {
          console.error('App getCurrentUser: problem loading', err);
          setCurrentUser(null);  // If there's an error, reset user data
        }
      }
      setInfoLoaded(true); // Set infoLoaded to true once data is fetched
    }

    // Before fetching data, mark that info is still being loaded
    setInfoLoaded(false);
    getCurrentUser();
  }, [token, setToken]);

  /** Handles site-wide signup.
   *
   * Signs up a new user, logs them in automatically, and saves their token.
   * */
  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData);
      
      // Save token and set it for the API
      setToken(token);

      // Decode token to extract username
      let { username } = jwt.decode(token);

      // Fetch current user data and update state
      let currentUser = await JoblyApi.getCurrentUser(username);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (errors) {
      console.error('signup failed', errors);
      return { success: false, errors };
    }
  }

  /** Handles site-wide login.
   *
   * Logs in a user, saves their token, and loads user data.
   * */
  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData);

      // Save token and set it for the API
      setToken(token);

      // Decode token to extract username
      let { username } = jwt.decode(token);

      // Fetch current user data and update state
      let currentUser = await JoblyApi.getCurrentUser(username);
      setCurrentUser(currentUser);
      return { success: true };
    } catch (errors) {
      console.error('login failed', errors);
      return { success: false, errors };
    }
  }

  /** Deletes a user and all their data.
   *
   * Logs out the user and removes their profile from the database.
   */
  async function deleteUser() {
    try {
      await JoblyApi.deleteProfile(currentUser.username);
      logout();
      return { success: true };
    } catch (errors) {
      console.error('delete failed', errors);
      return { success: false, errors };
    }
  }

  /** Checks if the current user has applied to a particular job. */
  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  /** Apply to a job:
   *
   * Makes an API call to apply to a job and updates the application IDs.
   */
  function applyToJob(id) {
    if (hasAppliedToJob(id)) return; // Avoid re-applying to the same job
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id])); // Update application set
  }

  /** Handles site-wide logout:
   *
   * Resets all state related to the current user and their session.
   */
  const logout = () => {
    setApplicationIds(new Set([]));  // Clear application IDs
    setCurrentUser(null);            // Reset current user to null
    setToken(null);                  // Remove token from localStorage
  };

  // Display loading spinner while user info is being fetched
  if (!infoLoaded) {
    return <LoadingSpinner />;
  }

  return (
    <div className="App mb-5">
      <BrowserRouter>
        <UserContext.Provider
          value={{ currentUser, setCurrentUser, hasAppliedToJob, applyToJob }}
        >
          <NavBar logout={logout} />
          <Routes login={login} signup={signup} deleteUser={deleteUser} />
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
};

export default App;
