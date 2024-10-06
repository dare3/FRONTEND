import React, { useState, useContext } from 'react';
import { Card, CardBody, Form, Label, Input, Button } from 'reactstrap';

import UserContext from '../UserContext';
import JoblyApi from '../common/api';
import JobsAppliedTo from '../jobs/JobsAppliedTo';

/** Edit profile form.
 *
 * Displays profile form and handles changes to local form state.
 * Submitting the form calls the API to save, and triggers user info reloading
 * throughout the site.
 *
 * Confirmation of a successful save.
 *
 * Routed as /profile
 * Routes -> ProfileForm
 */

const ProfileForm = ({ deleteUser }) => {
  const { currentUser, setCurrentUser } = useContext(UserContext);
  const INITIAL_STATE = {
    username: currentUser.username,
    password: '',
    firstName: currentUser.firstName,
    lastName: currentUser.lastName,
    email: currentUser.email,
  };

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [isShown, setIsShown] = useState(false);

  console.debug(
    'ProfileForm',
    'currentUser=',
    currentUser,
    'formData=',
    formData,
    'formErrors=',
    formErrors
  );

  const toggleJobsApplied = () => {
    setIsShown(prev => !prev);
  };

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value,
    }));
    setFormErrors([]); // Clear previous errors on change
  };

  /** on form submit:
   * - attempt save to backend & report any errors
   * - if successful
   *   - clear previous error messages and password
   *   - show save-confirmed message
   *   - set current user info throughout the site
   */
  const handleSubmit = async evt => {
    evt.preventDefault();

    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
    };

    try {
      const updatedUser = await JoblyApi.saveProfile(formData.username, profileData);
      setCurrentUser(updatedUser); // Update context with the new user info
      setMessage('Saved successfully!');
      setFormData(INITIAL_STATE); // Reset form data
      setFormErrors([]);
    } catch (errors) {
      setFormErrors(errors);
    }
  };

  return (
    <div className="Profile col-md-5 offset-md-4 col-lg-4 offset-lg-4 mt-3">
      <Card>
        <CardBody>
          <h1>Profile</h1>
          <Form className="ProfileForm-form" onSubmit={handleSubmit}>
            <Label htmlFor="username" className="ProfileForm-Label">
              Username
            </Label>
            <p>@{currentUser.username}</p>

            <Label htmlFor="firstName" className="ProfileForm-Label">
              First Name
            </Label>
            <Input
              className="ProfileForm-Input"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
            />

            <Label htmlFor="lastName" className="ProfileForm-Label">
              Last Name
            </Label>
            <Input
              className="ProfileForm-Input"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
            />

            <Label htmlFor="email" className="ProfileForm-Label">
              Email
            </Label>
            <Input
              className="ProfileForm-Input"
              id="email"
              name="email"
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <Label htmlFor="password" className="ProfileForm-Label">
              Confirm password to make changes:
            </Label>
            <Input
              className="ProfileForm-Input"
              id="password"
              name="password"
              type="password" // Changed to "password" type for security
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span className="ProfileForm-message">
              {formErrors.length > 0 && <p>{formErrors.join(', ')}</p>}
              {message && <p>{message}</p>}
            </span>

            <Button
              type="submit"
              className="btn btn-lg btn-block"
              color="primary"
              outline
            >
              Save Changes
            </Button>
          </Form>
        </CardBody>
      </Card>

      {/* Toggles list of jobs to show on page */}
      <div className="Expand text-center">
        <Button onClick={toggleJobsApplied} className="btn-sm m-3" color="info">
          {isShown ? 'Hide Applied Jobs' : 'Show Applied Jobs'}
        </Button>
      </div>
      {isShown && <JobsAppliedTo />}

      <div className="Delete text-center">
        <button
          onClick={deleteUser}
          className="btn btn-link my-5"
          style={{ color: 'red' }}
        >
          Delete my profile
        </button>
      </div>
    </div>
  );
};

export default ProfileForm;
