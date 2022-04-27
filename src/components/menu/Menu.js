import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import Context from "../../store/Context";

import classes from "./Menu.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;

const Menu = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const ctx = useContext(Context);
  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  const handleLogout = () => {
    ctx.logout();

    window.location.replace("/");
  };

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchResult(response.data.results);
    }
  };

  const menuHome = `${classes["menu-item"]} ${
    location.pathname === "/" && classes.current
  }`;
  const menuTv = `${classes["menu-item"]} ${path === "tv" && classes.current}`;
  const menuMovie = `${classes["menu-item"]} ${
    path === "movie" && classes.current
  }`;
  const menuFavorite = `${
    location.pathname.split("/")[3] === "favorite" && classes.current
  }`;
  const menuWatchlist = `${
    location.pathname.split("/")[3] === "watchlist" && classes.current
  }`;

  return (
    <div className={classes.menu}>
      <ul className={classes["menu-list"]}>
        <li className={menuHome}>
          <Link to="/" className={classes.link}>
            Home
          </Link>
        </li>
        <li className={menuMovie}>
          <Link to={`/movie`} className={classes.link}>
            Movies
          </Link>
        </li>
        <li className={menuTv}>
          <Link to={`/tv`} className={classes.link}>
            TV Shows
          </Link>
        </li>
        {ctx.user && <li className={classes["menu-item"]}>My Page</li>}
      </ul>
      <div className={classes.search}>
        <AiOutlineSearch />
        <input
          type="text"
          autoComplete="off"
          className={classes["search-input"]}
          onChange={handleSearch}
        />
      </div>
      {ctx.user ? (
        <div className={classes["logout-button"]} onClick={handleLogout}>
          Log Out
        </div>
      ) : (
        <div className={classes["login-button"]}>
          <Link to="/login" className={classes.link}>
            Log In
          </Link>
        </div>
      )}
    </div>
  );
};

export default Menu;

/*
<div className={classes["menu-card"]}>
        <h1>LIBRARY</h1>
        <ul>
          <li className={menuWatchlist}>
            <Link
              to={`/account/${ctx.user && ctx.user.id}/watchlist`}
              className={classes.link}
            >
              <TiThList />
              Watchlist
            </Link>
          </li>
          <li className={menuFavorite}>
            <Link
              to={`/account/${ctx.user && ctx.user.id}/favorite`}
              className={classes.link}
            >
              <AiFillHeart />
              Favorite
            </Link>
          </li>
          <li>
            <BsBookmarkFill />
            Bookmark
          </li>
        </ul>
      </div>
      */
