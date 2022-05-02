import React, { useState, useContext } from "react";

import Context from "../../store/Context";

import classes from "./Profile.module.css";
import Chart from "./Chart";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

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

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <div className={classes.user}>
          <img
            src={`https://images.unsplash.com/photo-1524504388940-b1c1722653e1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80`}
            alt="profile image"
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
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                    />
                    <span>{`${movie.title} (${movie.rating})`}</span>
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
                    <img
                      src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
                      alt={tv.name}
                    />
                    <span>{`${tv.name} (${tv.rating})`}</span>
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

/*
{mostWatchedGenres &&
  Object.keys(mostWatchedGenres)
  .filter((id, index) => index < 6)
  .map((id) => (
    <div className={classes["graph-list-item"]}>
      <span
        style={{
          width: "10px",
          height: `${mostWatchedGenres[id] * 20}px`,
          backgroundColor: "#333",
          marginBottom: "5px",
        }}
      ></span>
      <span>{genre[id]}</span>
    </div>
))}
*/
