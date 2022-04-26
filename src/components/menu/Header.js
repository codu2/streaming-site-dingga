import React from "react";

import classes from "./Header.module.css";
import Menu from "./Menu";

const Header = () => {
  return (
    <div className={classes.header}>
      <div className={classes.logo}>DINGGA</div>
      <Menu />
    </div>
  );
};

export default Header;
