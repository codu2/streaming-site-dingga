import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import { FaPlus } from "react-icons/fa";
import classes from "./TvMainSection.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

const TvMainSection = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  return (
    <div className={classes.tv}>
      <div className={classes["main-tv"]}>
        <img
          src={
            data[0].backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data[0].backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${data[0].poster_path}`
          }
          alt={data[0].name}
        />
        <div className={classes["main-tv-desc"]}>
          <div className={classes["main-tv-title"]}>{data[0].name}</div>
          <div className={classes.actions}>
            <button className={classes.watch}>
              <Link to={`/tv/${data[0].id}`} className={classes.link}>
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

export default TvMainSection;
