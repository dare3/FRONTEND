import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Change this line
import { Card, CardBody, Form, Label, Input, Button } from 'reactstrap';

/** User signup form.
 *
 * Manages state for form fields, handles submission, and 
 * redirects to the /companies route upon successful signup.
 *
 * Routes -> SignupForm
 * Routed as /signup
 */

const SignUpForm = ({ signup }) => {
  const navigate = useNavigate(); // Change this line
  const INITIAL_STATE = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: ''
  };
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [formErrors, setFormErrors] = useState([]);

  console.debug(
    'SignupForm',
    'signup=',
    typeof signup,
    'formData=',
    formData,
    'formErrors=',
    formErrors
  );

  /** Update form fields */
  const handleChange = evt => {
    const { name, value } = evt.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  /** Handle form submission */
  const handleSubmit = async evt => {
    evt.preventDefault();
    try {
      const result = await signup(formData);
      if (result.success) {
        // Redirect to the /companies route
        navigate('/companies'); // Change this line
      } else {
        // Set any form errors returned from signup
        setFormErrors(result.errors);
      }
    } catch (err) {
      console.error('Signup error:', err);
      setFormErrors(['An unexpected error occurred. Please try again.']);
    }
  };

  return (
    <div className="SignUpForm col-md-5 offset-md-4 col-lg-4 offset-lg-4">
      <h1>Sign Up</h1>
      <Card>
        <CardBody>
          <Form className="SignUpForm-form" onSubmit={handleSubmit}>
            <Label htmlFor="username" className="SignUpForm-Label">
              Username
            </Label>
            <Input
              className="SignUpForm-Input"
              id="username"
              name="username"
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <Label htmlFor="password" className="SignUpForm-Label">
              Password
            </Label>
            <Input
              className="SignUpForm-Input"
              id="password"
              name="password"
              type="password" // Changed to 'password' for security
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <Label htmlFor="firstName" className="SignUpForm-Label">
              First Name
            </Label>
            <Input
              className="SignUpForm-Input"
              id="firstName"
              name="firstName"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <Label htmlFor="lastName" className="SignUpForm-Label">
              Last Name
            </Label>
            <Input
              className="SignUpForm-Input"
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <Label htmlFor="email" className="SignUpForm-Label">
              Email
            </Label>
            <Input
              className="SignUpForm-Input"
              id="email"
              name="email"
              type="email" // Changed to 'email' for validation
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <span className="NewItemForm-formErrors">
              {formErrors.length > 0 && <p>{formErrors.join(', ')}</p>}
            </span>
            <Button
              type="submit"
              className="btn btn-lg btn-block"
              color="primary"
            >
              Sign Up
            </Button>
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default SignUpForm;
