import React from "react";
import { useState } from "react";
import axios from "../components/api/axios";
import Button from "../components/Button";

function Register() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { firstName, lastName, email, password } = data;

  const changeHandler = (e) => {
    setData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const createUser = async (e) => {
    const request = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await axios.post(
        "/course/newuser",
        JSON.stringify(request),
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error("Server Error:", error.response.status);
        setError("Error creating your user. Please retry");
      } else if (error.request) {
        console.error("Network Error:", error.request);
        setError("A network error occured. Please contact the administrator");
      } else {
        console.error("Error:", error.message);
        setError("An unknown error occured. Please contact the administrator");
      }
    }
  };
  return (
    <>
      <div className="div-container">
        <div className="form-container">
          <div className="welcome-row">
            <h1>User Registration </h1>
            <br />
            <p>Please your details below</p>
          </div>
          <form className="my-form" onSubmit={createUser}>
            <div className="input-field">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                type="text"
                maxLength={50}
                name="firstName"
                value={firstName}
                onChange={changeHandler}
                disabled={isLoading || isSuccess}
              />
            </div>
            <div className="input-field">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                type="text"
                maxLength={50}
                name="lastName"
                value={lastName}
                onChange={changeHandler}
                disabled={isLoading || isSuccess}
              />
            </div>

            <div className="input-field">
              <label htmlFor="email">Email address:</label>
              <input
                id="email"
                type="email"
                maxLength={50}
                name="email"
                value={email}
                onChange={changeHandler}
                disabled={isLoading || isSuccess}
              />
            </div>

            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                maxLength={50}
                name="password"
                value={password}
                onChange={changeHandler}
                disabled={isLoading || isSuccess}
              />
            </div>

            <Button
              text="Submit"
              loading={isLoading}
              disabled={isLoading || isSuccess}
            />
          </form>
          {error && <p className="error">{error}</p>}
          {isSuccess && (
            <p className="success">
              Your user has been created. <br />
              Please click on 'Home' to login.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default Register;
