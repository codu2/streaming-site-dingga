import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./MovieItem.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

const MovieItem = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  return (
    <div className={classes["movie-item"]}>
      <div className={classes["movie-item-top"]}>
        <h1>Popular Movies</h1>
        <div className={classes["slide-button"]}>
          <span>
            <IoIosArrowBack />
          </span>
          <span>
            <IoIosArrowForward />
          </span>
        </div>
      </div>
      <ul className={classes.items}>
        {data.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className={classes["movie-item-card"]}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  }
                  alt={movie.title}
                />
                <div className={classes["movie-title"]}>{movie.title}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieItem;
