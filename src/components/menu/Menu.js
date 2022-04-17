import React from "react";
import { Link, useLocation } from "react-router-dom";

import classes from "./Menu.module.css";
import {
  AiFillHome,
  AiFillClockCircle,
  AiFillStar,
  AiFillProfile,
} from "react-icons/ai";
import {
  RiCommunityFill,
  RiCompassDiscoverFill,
  RiSlideshow3Fill,
  RiFolderDownloadFill,
  RiMovie2Fill,
  RiLogoutBoxRFill,
} from "react-icons/ri";
import { BsFillAwardFill, BsFillCameraVideoFill } from "react-icons/bs";

const Menu = () => {
  const location = useLocation();

  const menuHome = `${location.pathname === "/" && classes.current}`;
  const menuTv = `${location.pathname === "/tv" && classes.current}`;
  const menuMovie = `${location.pathname === "/movie" && classes.current}`;

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
        <h1>LIBRARY</h1>
        <ul>
          <li>
            <AiFillClockCircle />
            Recent
          </li>
          <li>
            <AiFillStar />
            Top Rated
          </li>
          <li>
            <RiFolderDownloadFill />
            Downloaded
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
        <h1>GENERAL</h1>
        <ul>
          <li>
            <AiFillProfile />
            Profile
          </li>
          <li>
            <RiLogoutBoxRFill />
            Log Out
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
