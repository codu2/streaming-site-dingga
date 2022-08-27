import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";

import axios from "axios";

import classes from "./Pages.module.css";
import { AiOutlineSearch } from "react-icons/ai";
//import { RiMovie2Fill, RiSlideshow3Fill } from "react-icons/ri";
//import { BsFillPersonFill } from "react-icons/bs";

const API_KEY = process.env.REACT_APP_API_KEY;

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const search = useCallback(async (query) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
    );
    setSearchResult(response.data.results);
  }, []);

  const handleSearchInput = async (e) => {
    window.history.pushState("", "search", `/search?q=${e.target.value}`);
    if (e.target.value !== "") {
      setQuery(e.target.value);
      search(e.target.value);
    } else {
      setQuery("");
      setSearchResult([]);
    }
  };

  useEffect(() => {
    if (q) {
      setQuery(q);
      search(q);
    }
  }, [q, search]);

  return (
    <div className={classes.container}>
      <div className={classes["search-wrapper"]}>
        <h1>Search for Movies, TV series, and Actors</h1>
        <div className={classes.search}>
          <label htmlFor="searchInput">
            <AiOutlineSearch />
          </label>
          <input
            type="text"
            autoComplete="off"
            className={classes["search-input"]}
            id="searchInput"
            onChange={handleSearchInput}
            value={query}
            placeholder="Search"
          />
        </div>
      </div>
      <ul className={classes["search-result"]}>
        {searchResult.map((result) => (
          <li key={result.id} className={classes["search-result-item"]}>
            {result.backdrop_path ||
            result.poster_path ||
            result.profile_path ? (
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
            ) : (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "180px",
                  height: "120px",
                  paddingBottom: "15px",
                  fontSize: "10px",
                  color: "#d7d7d7",
                  backgroundColor: "#222",
                }}
              >
                No Image
              </div>
            )}
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
