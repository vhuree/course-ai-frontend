import { useState } from "react";
import { useAuth } from "../components/auth/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../components/api/axios";
import Button from "../components/Button";

const LOGIN_URL = "/course/login";

export const Login = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectPath = location.state?.path || "/";
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = data;

  const changeHandler = (e) => {
    setData((prevData) => ({ ...prevData, [e.target.name]: e.target.value }));
  };

  const authenticate = async (e) => {
    console.log(data);
    console.log(JSON.stringify(data));
    try {
      e.preventDefault();
      setError(null);
      setIsLoading(true);
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = await axios.post(LOGIN_URL, JSON.stringify(data), {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsLoading(false);
      auth.login(true);
      console.log(response.data);
      navigate(redirectPath, { replace: true });
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error("Server Error:", error.response.status);
        setError("Invalid userid / password");
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
            <h1>Student Login</h1>
            <p>Please enter your details!</p>
          </div>
          <form className="my-form" onSubmit={(e) => authenticate(e)}>
            <div className="input-field">
              <label htmlFor="email">User Id:</label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                placeholder="Your Email Address"
                required
                onChange={changeHandler}
                disabled={isLoading}
                autoComplete="off"
              />
            </div>
            <div className="input-field">
              <label htmlFor="password">Password:</label>
              <input
                id="password"
                type="password"
                name="password"
                value={password}
                required
                onChange={changeHandler}
                disabled={isLoading}
                autoComplete="off"
                minLength={6}
                placeholder="Your Password"
              />
            </div>
            <Button text="Login" loading={isLoading} disabled={isLoading} />
          </form>
          {error && <p className="error">{error}</p>}
          <div className="input-field">
            <div onClick={() => navigate("/register", { replace: true })}>
              Dont have an account ? Click here to create
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
