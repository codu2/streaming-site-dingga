import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import { FaPlus } from "react-icons/fa";
import classes from "./MainSection.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

const MainSection = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  return (
    <div className={classes.movie}>
      <div className={classes["main-movie"]}>
        <img
          src={
            data[0].backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data[0].backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${data[0].poster_path}`
          }
          alt={data[0].title}
        />
        <div className={classes["main-movie-desc"]}>
          <div className={classes["main-movie-title"]}>{data[0].title}</div>
          <div className={classes.actions}>
            <button className={classes.watch}>
              <Link to={`/movie/${data[0].id}`} className={classes.link}>
                Watch Now
              </Link>
            </button>
            <button className={classes.add}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainSection;
