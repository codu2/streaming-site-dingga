import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";

import Context from "../../store/Context";

import classes from "./Menu.module.css";
import { AiFillHome, AiFillHeart, AiFillProfile } from "react-icons/ai";
import {
  RiCommunityFill,
  RiCompassDiscoverFill,
  RiSlideshow3Fill,
  RiMovie2Fill,
  RiLoginBoxFill,
  RiLogoutBoxRFill,
} from "react-icons/ri";
import {
  BsFillAwardFill,
  BsFillCameraVideoFill,
  BsBookmarkFill,
} from "react-icons/bs";
import { TiThList } from "react-icons/ti";

const Menu = () => {
  const location = useLocation();
  const ctx = useContext(Context);

  const handleLogout = () => {
    ctx.logout();
    window.location.replace("/");
  };

  const menuHome = `${location.pathname === "/" && classes.current}`;
  const menuTv = `${location.pathname === "/tv" && classes.current}`;
  const menuMovie = `${location.pathname === "/movie" && classes.current}`;
  const menuFavorite = `${
    location.pathname.split("/")[3] === "favorite" && classes.current
  }`;
  const menuWatchlist = `${
    location.pathname.split("/")[3] === "watchlist" && classes.current
  }`;

  return (
    <div className={classes.menu}>
      <div className={classes["menu-card"]}>
        <h1>MENU</h1>
        <ul>
          <li className={menuHome}>
            <Link to="/" className={classes.link}>
              <AiFillHome />
              Home
            </Link>
          </li>
          <li>
            <RiCommunityFill />
            Community
          </li>
          <li>
            <RiCompassDiscoverFill />
            Discover
          </li>
          <li>
            <BsFillAwardFill />
            Awards
          </li>
        </ul>
      </div>
      <div className={classes["menu-card"]}>
        <h1>CATEGORY</h1>
        <ul>
          <li className={menuTv}>
            <Link to={`/tv`} className={classes.link}>
              <RiSlideshow3Fill />
              TV Show
            </Link>
          </li>
          <li className={menuMovie}>
            <Link to={`/movie`} className={classes.link}>
              <RiMovie2Fill />
              Movie
            </Link>
          </li>
          <li>
            <BsFillCameraVideoFill />
            All
          </li>
        </ul>
      </div>
      <div className={classes["menu-card"]}>
        <h1>LIBRARY</h1>
        <ul>
          <li className={menuWatchlist}>
            <Link
              to={`/account/${ctx.user.id}/watchlist`}
              className={classes.link}
            >
              <TiThList />
              Watchlist
            </Link>
          </li>
          <li className={menuFavorite}>
            <Link
              to={`/account/${ctx.user.id}/favorite`}
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
      <div className={classes["menu-card"]}>
        <h1>GENERAL</h1>
        <ul>
          <li>
            <AiFillProfile />
            Profile
          </li>
          {ctx.user ? (
            <li onClick={handleLogout}>
              <RiLogoutBoxRFill />
              Log Out
            </li>
          ) : (
            <li>
              <Link to="/login" className={classes.link}>
                <RiLoginBoxFill />
                Log In
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
