import React from "react";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./TvShowItem.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
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
    <div className={classes["tv-item"]}>
      <div className={classes["tv-item-top"]}>
        <h1>Popular TV Show</h1>
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
        {data.map((tv) => (
          <li key={tv.id}>
            <div className={classes["tv-item-card"]}>
              <img
                src={
                  tv.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`
                }
                alt={tv.name}
              />
              <div className={classes["tv-title"]}>{tv.name}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieItem;
