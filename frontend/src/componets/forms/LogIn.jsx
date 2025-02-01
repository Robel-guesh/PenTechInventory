import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAppContext } from "../../contexts/AppContext";

const Login = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { backendUrl, loggedUser, setAdminStatus } = useAppContext();
  const loginRoute = "/user/api/login";
  useEffect(() => {
    if (loggedUser) {
      navigate("/");
    }
  }, [loggedUser, navigate]);
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${backendUrl}${loginRoute}`, credentials);
      // Assuming the response contains a token that can be used for authentication
      console.log(res.data.token);
      localStorage.removeItem("token");
      localStorage.removeItem("loggedUser");
      localStorage.setItem("token", res.data.token);
      // Assuming res.data.loggedUser contains the user data you want to store
      localStorage.setItem("loggedUser", JSON.stringify(res.data.loggedUser));

      // Set the admin status to true after successful login
      // setAdminStatus(true); // Set isAdmin to true after successful login

      // Redirect to the admin page
      if (res.data.loggedUser.isVerified) {
        navigate("/");
        window.location.reload();
      }
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div
      className="container  d-flex flex-column justify-content-start mt-5  align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="login-form">
        <h2 className="d-flex justify-content-center">Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={credentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={credentials.password}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
          {/* <div>
            <Link to="/register" className="d-flex justify-content-center m-2">
              Forgot Password
            </Link>
          </div>
          <div>
            <Link to="/register" className="d-flex justify-content-center ">
              Already Have An Account
            </Link>
          </div> */}
        </form>
      </div>
    </div>
  );
};

export default Login;
