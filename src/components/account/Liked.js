import React, { useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";
import Context from "../../store/Context";

import classes from "./Account.module.css";
import { AiFillHeart } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

const Liked = () => {
  const ctx = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  useEffect(() => {
    if (!ctx.user) {
      window.location.replace("/login");
    }
  }, [path]);

  const getFavoriteMovie = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`
    );
    return response.data.results;
  };

  const getFavoriteTv = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite/tv?api_key=${API_KEY}&session_id=${SESSION_ID}`
    );
    return response.data.results;
  };

  const [favoriteMovie] = useAsync(getFavoriteMovie, []);
  const [favoriteTvShow] = useAsync(getFavoriteTv, []);

  const { data: favoriteMovies } = favoriteMovie;
  const { data: favoriteTvShows } = favoriteTvShow;

  return (
    <div className={classes.container}>
      <h1>
        <AiFillHeart />
        Liked
      </h1>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <h1>Movies</h1>
          <ul className={classes["section-list"]}>
            {favoriteMovies &&
              favoriteMovies.map((item) => (
                <li key={item.id}>
                  <Link to={`/movie/${item.id}`} className={classes.link}>
                    <div className={classes["section-item"]}>
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                        }
                        alt={item.title}
                        className={item.img}
                      />
                      <div className={classes["section-item-info"]}>
                        <div className={classes.title}>{item.title}</div>
                        <div className={classes.info}>
                          {`${item.release_date}(${
                            item.original_language && item.original_language
                          })`}
                        </div>
                        <div className={classes.overview}>{item.overview}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
        <div className={classes.section}>
          <h1>TV Shows</h1>
          <ul className={classes["section-list"]}>
            {favoriteTvShows &&
              favoriteTvShows.map((item) => (
                <li key={item.id}>
                  <Link to={`/tv/${item.id}`} className={classes.link}>
                    <div className={classes["section-item"]}>
                      <img
                        src={
                          item.poster_path
                            ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                        }
                        alt={item.name}
                        className={item.img}
                      />
                      <div className={classes["section-item-info"]}>
                        <div className={classes.title}>{item.name}</div>
                        <div className={classes.info}>
                          {`${item.first_air_date}(${
                            item.origin_country && item.origin_country[0]
                          })`}
                        </div>
                        <div className={classes.overview}>{item.overview}</div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Liked;
