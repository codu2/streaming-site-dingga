import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";

import axios from "axios";

import classes from "./Pages.module.css";
import { AiOutlineSearch, AiOutlineEnter } from "react-icons/ai";
import { RiMovie2Fill, RiSlideshow3Fill } from "react-icons/ri";
import { BsFillPersonFill } from "react-icons/bs";

const API_KEY = process.env.REACT_APP_API_KEY;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const handleSearchInput = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchParams = () => {
    if (query !== "") {
      window.location.replace(`/search?q=${query}`);
    } else {
      window.alert("Please enter a search term.");
    }
  };

  const handleSearch = async (e) => {
    if (q !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${q}&page=1&include_adult=false`
      );
      setSearchResult(response.data.results);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [query]);

  console.log(searchResult);
  return (
    <div className={classes.container}>
      <div className={classes.search}>
        <h1>Search Results</h1>
        <div className={classes["search-input"]}>
          <AiOutlineSearch />
          <input
            type="text"
            autoComplete="off"
            className={classes["search-input"]}
            onChange={handleSearchInput}
          />
          <AiOutlineEnter onClick={handleSearchParams} />
        </div>
      </div>
      <ul className={classes["search-result"]}>
        {searchResult.map((result) => (
          <li key={result.id} className={classes["search-result-item"]}>
            <img
              src={
                result.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${result.backdrop_path}`
                  : result.poster_path
                  ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                  : `https://image.tmdb.org/t/p/w500${result.profile_path}`
              }
              alt={result.title ? result.title : result.name}
            />
            <div className={classes["search-result-link"]}>
              <Link
                to={`/${result.media_type}/${result.id}`}
                className={classes.link}
              >
                {result.title ? result.title : result.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
