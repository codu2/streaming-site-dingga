import React, { useState, useContext } from "react";

import axios from "axios";
import Context from "../../store/Context";

import classes from "./Login.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

const Login = () => {
  const ctx = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      if (username !== "" && password !== "") {
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

        if (response.data.success) {
          /*
          const getSessionId = await axios.post(
            `https://api.themoviedb.org/3/authentication/session/new?api_key=${API_KEY}`,
            {
              request_token: getNewToken.data.request_token,
            }
          );
  
          const getAccount = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${getSessionId.data.session_id}`
          );
          */

          const getAccount = await axios.get(
            `https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${SESSION_ID}`
          );

          ctx.loggedInUser(getAccount.data);

          setLoading(false);
          window.location.replace("/");
        }
      } else {
        setLoading(false);
        window.alert("Please check the username or password again.");
      }
    } catch (err) {
      setLoading(false);

      console.log(err);
    }
  };

  return (
    <div className={classes.container}>
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
