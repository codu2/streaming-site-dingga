import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./AllSection.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}`
  );
  return response.data.results;
};

const TopRatedTvShow = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  return (
    <div className={classes["all-section"]}>
      <div className={classes["item-top"]}>
        <h1>TV-Show: Top Rated</h1>
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
        {data.map((item) => (
          <li key={item.id}>
            <Link to={`/tv/${item.id}`}>
              <div className={classes["item-card"]}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  }
                  alt={item.name}
                />
                <div className={classes["item-title"]}>{item.name}</div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopRatedTvShow;
