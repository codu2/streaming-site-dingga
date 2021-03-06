import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./WatchingMovie.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results[0];
};

const WatchingMovie = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  return (
    <div className={classes["movie-card"]}>
      <Link to={`/movie/${data.id}`}>
        <img
          src={
            data.poster_path
              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
          }
          alt={data.title}
        />
      </Link>
      <div className={classes["movie-info"]}>
        <div className={classes.title}>{data.title}</div>
        <div className={classes.date}>{data.release_date}</div>
        <div className={classes.overview}>{data.overview}</div>
      </div>
    </div>
  );
};

export default WatchingMovie;
