import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import classes from "./SideBar.module.css";
import SingleItem from "./SingleItem";
import WatchingMovie from "./WatchingMovie";
import { RiMovie2Fill, RiSlideshow3Fill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";

const API_KEY = process.env.REACT_APP_API_KEY;

const SideBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchResult(response.data.results);
    }
  };

  console.log(searchResult);

  return (
    <div className={classes["side-bar"]}>
      <input
        type="text"
        placeholder="Search"
        onChange={handleSearch}
        className={classes["search-input"]}
      />
      {query && searchResult && (
        <div className={classes["search-result"]}>
          <ul className={classes["search-result-list"]}>
            {searchResult.map((result) => (
              <li
                key={result.id}
                className={classes["search-result-list-item"]}
              >
                <span>
                  {result.original_title ? (
                    <RiMovie2Fill />
                  ) : result.original_name ? (
                    <RiSlideshow3Fill />
                  ) : (
                    <BsFillPersonFill />
                  )}
                </span>
                <span>
                  <Link
                    to={`/${result.media_type}/${result.id}`}
                    className={classes.link}
                  >
                    {result.original_title
                      ? result.original_title
                      : result.original_name
                      ? result.original_name
                      : result.name}
                  </Link>
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className={classes["side-section"]}>
        <h1>Upcoming</h1>
        <div className={classes["side-top"]}>
          <WatchingMovie />
        </div>
      </div>
      <div className={classes["side-section"]}>
        <h1>Today's Trending</h1>
        <div className={classes["side-bottom"]}>
          <SingleItem />
        </div>
      </div>
    </div>
  );
};

export default SideBar;
