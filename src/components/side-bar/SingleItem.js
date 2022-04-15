import React from "react";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./SingleItem.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  //const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?primary_release_date.gte=2021-12-01&primary_release_date.lte=2021-12-31&api_key=${api_key}`,);
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
  );
  return response.data.results;
};

const SingleItem = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  return (
    <React.Fragment>
      <div className={classes["item-card"]}>
        <img
          src={
            data[0].backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data[0].backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${data[0].poster_path}`
          }
          alt="list-item"
        />
        {data[0].title || data[0].name ? (
          <div className={classes["item-title"]}>
            {data[0].media_type === "movie" ? data[0].title : data[0].name}
          </div>
        ) : null}
      </div>
      <div className={classes["item-card"]}>
        <img
          src={
            data[1].backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data[1].backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${data[1].poster_path}`
          }
          alt="list-item"
        />
        {data[1].title || data[1].name ? (
          <div className={classes["item-title"]}>
            {data[1].media_type === "movie" ? data[1].title : data[1].name}
          </div>
        ) : null}
      </div>
    </React.Fragment>
  );
};

export default SingleItem;
