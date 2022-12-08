import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { createUser } from '../utils/api';
import Auth from '../utils/auth';

const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await createUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div class="container mt-5">
      <div class="row d-flex justify-content-center w-100">
        <div class="col-6">
          <div class="card shadow">
            <div class="card-header">
              <h2>Signup</h2>
            </div>
            <div class="card-body">
              <form>
                <div class="mb-3">
                  <label for="usernameInput" class="form-label">Username</label>
                  <input type="text" class="form-control" id="usernameInput" />
                </div>
                <div class="mb-3">
                  <label for="emailInput" class="form-label">Email</label>
                  <input type="email" class="form-control" id="usernameInput"
                    placeholder="name@example.com" />
                </div>
                <div class=" mb-3">
                  <label for="passwordInput" class="form-label">Password</label>
                  <input type="password" class="form-control" id="passwordInput" />
                </div>
                <div class="mb-3">
                  <label for="verifyPasswordInput" class="form-label">Verify Password</label>
                  <input type="password" class="form-control" id="verifyPasswordInput" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Signup;