import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import Context from "../../store/Context";
import axios from "axios";

import classes from "./Menu.module.css";
import { AiOutlineSearch } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;

const Menu = ({ sideMenu, setSideMenu }) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const ctx = useContext(Context);
  const [query, setQuery] = useState("");
  const [submenu, setSubmenu] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleLogout = () => {
    ctx.logout();

    window.location.replace("/");
  };

  const handleSearchInput = async (e) => {
    if (e.target.value !== "") {
      setQuery(e.target.value);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchResult(response.data.results);
    } else {
      setQuery("");
      setSearchResult([]);
    }
  };

  const handleSubmenu = (action) => {
    if (action === "enter") {
      setSubmenu(true);
    } else {
      setSubmenu(false);
    }
  };

  const handleSideMenu = () => {
    setSideMenu(false);
  };

  const menuList = `${classes["menu-list"]} ${sideMenu && classes.active}`;
  const menuSearch = `${classes.search} ${sideMenu && classes.active}`;
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
  const menuProfile = `${
    location.pathname.split("/")[3] === "profile" && classes.current
  }`;

  return (
    <div className={classes.menu}>
      <ul className={menuList}>
        <li className={menuMovie} onClick={handleSideMenu}>
          <Link to={`/movie`} className={classes.link}>
            Movies
          </Link>
        </li>
        <li className={menuTv} onClick={handleSideMenu}>
          <Link to={`/tv`} className={classes.link}>
            TV Shows
          </Link>
        </li>
        {ctx.user && (
          <li
            className={classes["menu-item"]}
            onMouseEnter={() => handleSubmenu("enter")}
            onMouseLeave={() => handleSubmenu("leave")}
          >
            My Page
            {submenu && (
              <ul className={classes["sub-menu-item"]}>
                <li className={menuFavorite} onClick={handleSideMenu}>
                  <Link
                    to={`/account/${ctx.user.id}/favorite`}
                    className={classes.link}
                  >
                    Favorites
                  </Link>
                </li>
                <li className={menuWatchlist} onClick={handleSideMenu}>
                  <Link
                    to={`/account/${ctx.user.id}/watchlist`}
                    className={classes.link}
                  >
                    Watchlist
                  </Link>
                </li>
                <li>Bookmark</li>
                <li className={menuProfile} onClick={handleSideMenu}>
                  <Link
                    to={`/account/${ctx.user.id}/profile`}
                    className={classes.link}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            )}
          </li>
        )}
      </ul>
      <div className={menuSearch}>
        <label htmlFor="searchInput">
          <AiOutlineSearch />
        </label>
        <input
          type="text"
          autoComplete="off"
          className={classes["search-input"]}
          id="searchInput"
          onChange={handleSearchInput}
          placeholder="Search"
          value={query}
        />
        {searchResult.length !== 0 && (
          <div className={classes["search-result-wrapper"]}>
            <div
              className={classes["search-result-query"]}
            >{`Search Results for "${query}"`}</div>
            <ul className={classes["search-result"]}>
              {searchResult
                ?.filter((result, index) => index < 5)
                .map((result) => (
                  <li
                    key={result?.id}
                    onClick={() => {
                      window.location.replace(`/search?q=${result?.name}`);
                    }}
                  >
                    {result?.media_type === "movie"
                      ? result?.title
                      : result?.name}
                  </li>
                ))}
            </ul>
            <div
              className={classes["search-result-link"]}
              onClick={() => {
                setQuery("");
                setSearchResult([]);
              }}
            >
              <Link to={`/search?q=${query}`}>View more search results</Link>
            </div>
          </div>
        )}
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
