import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Context from "../../store/Context";

import classes from "./Profile.module.css";
import Chart from "./Chart";
import { AiOutlineMinusCircle } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

const Profile = () => {
  const ctx = useContext(Context);
  const [userInfo, SetUserInfo] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleUserInfo = (e) => {
    SetUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const handleRating = async (data) => {
    const response = await axios.delete(
      `https://api.themoviedb.org/3/${data.title ? "movie" : "tv"}/${
        data.id
      }/rating?api_key=${API_KEY}&session_id=${SESSION_ID}`
    );
    if (response.data.success) {
      window.location.reload();
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.user}>
          <img
            src={`https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`}
            alt="user profile"
            className={classes["user-img"]}
          />
          <div className={classes["user-info"]}>
            <label htmlFor="username">username</label>
            <input
              type="text"
              placeholder="codu2"
              className={classes["user-input"]}
              id="username"
              autoComplete="off"
              onChange={handleUserInfo}
              name="username"
            />
            <label htmlFor="email">email</label>
            <input
              type="text"
              placeholder="codu2@email.com"
              className={classes["user-input"]}
              id="email"
              autoComplete="off"
              onChange={handleUserInfo}
              name="email"
            />
            <label htmlFor="password">password</label>
            <input
              type="password"
              placeholder="******"
              className={classes["user-input"]}
              id="password"
              onChange={handleUserInfo}
              name="password"
            />
          </div>
        </div>
        <div className={classes.graph}>
          <h1>Most Watched Genres</h1>
          <div className={classes["graph-chart"]}>
            <Chart />
          </div>
        </div>
      </div>
      <div className={classes.rating}>
        <h1>My Ratings</h1>
        <div className={classes["rating-wrapper"]}>
          <div className={classes["rating-movie"]}>
            <h1>Rated Movies</h1>
            <ul className={classes["rating-list"]}>
              {ctx.rated_movie &&
                ctx.rated_movie.map((movie) => (
                  <div key={movie.id} className={classes["rating-list-item"]}>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                      />
                    </Link>
                    <span>{`${movie.title} (${movie.rating})`}</span>
                    <span
                      className={classes["rating-remove"]}
                      onClick={() => handleRating(movie)}
                    >
                      <AiOutlineMinusCircle />
                    </span>
                  </div>
                ))}
            </ul>
          </div>
          <div className={classes["rating-tv"]}>
            <h1>Rated TV Shows</h1>
            <ul className={classes["rating-list"]}>
              {ctx.rated_tv &&
                ctx.rated_tv.map((tv) => (
                  <div key={tv.id} className={classes["rating-list-item"]}>
                    <Link to={`/tv/${tv.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                        alt={tv.name}
                      />
                    </Link>
                    <span>{`${tv.name} (${tv.rating})`}</span>
                    <span
                      className={classes["rating-remove"]}
                      onClick={() => handleRating(tv)}
                    >
                      <AiOutlineMinusCircle />
                    </span>
                  </div>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
