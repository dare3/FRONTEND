import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import UserContext from '../UserContext';
import './NavBar.css';

/** Navigation bar for the site. Shows up on every page.
 *
 * When the user is logged in, shows links to main areas of the site. When not,
 * shows links to Login and Signup forms.
 *
 * Rendered by App.
 */
const NavBar = ({ logout }) => {
  const { currentUser } = useContext(UserContext);
  console.debug('NavBar', 'currentUser=', currentUser);

  // Navigation links for logged-in users
  const loggedInNav = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/companies">
          Companies
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/jobs">
          Jobs
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/profile">
          Profile
        </NavLink>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to="/" onClick={logout}>
          Log out {currentUser.first_name || currentUser.username}
        </Link>
      </li>
    </ul>
  );

  // Navigation links for logged-out users
  const loggedOutNav = () => (
    <ul className="navbar-nav ml-auto">
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/login">
          Login
        </NavLink>
      </li>
      <li className="nav-item mr-4">
        <NavLink className="nav-link" to="/signup">
          Sign Up
        </NavLink>
      </li>
    </ul>
  );

  return (
    <nav className="NavBar navbar navbar-expand-md mb-5">
      <Link className="navbar-brand" to="/">
        Jobly
      </Link>
      {currentUser ? loggedInNav() : loggedOutNav()}
    </nav>
  );
};

export default NavBar;
