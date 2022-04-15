import React from "react";

import classes from "./SideBar.module.css";
import SingleItem from "./SingleItem";
import WatchingMovie from "./WatchingMovie";

const SideBar = () => {
  return (
    <div className={classes["side-bar"]}>
      <input type="text" placeholder="Search" />
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
