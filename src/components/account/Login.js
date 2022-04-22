import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import classes from "./Login.module.css";
import { AiFillHome } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const getNewToken = await axios.get(
        `https://api.themoviedb.org/3/authentication/token/new?api_key=${API_KEY}`
      );

      const response = await axios.post(
        `https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${API_KEY}`,
        {
          username: username,
          password: password,
          request_token: getNewToken.data.request_token,
        }
      );
      setState(response.data);
      setLoading(false);

      window.location.replace("/");
    } catch (err) {
      setLoading(false);

      window.alert("Please check the username or password again.");
    }
  };

  return (
    <div className={classes.container}>
      <Link to="/" className={classes["home-button"]}>
        <AiFillHome />
      </Link>
      <form className={classes.login} onSubmit={handleSubmit}>
        <h1>Log In</h1>
        <div className={classes["login-form"]}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            className={classes["login-input"]}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            className={classes["login-input"]}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className={classes["login-button"]}
            disabled={loading}
          >
            Log In
          </button>
          <div className={classes["signup-button"]}>
            <p> If you don't have an account yet please register first.</p>
            <button type="button">Sign Up</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
