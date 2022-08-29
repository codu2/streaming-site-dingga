import React, { useState } from "react";
import { Link } from "react-router-dom";

import classes from "./Header.module.css";
import Menu from "./Menu";

import { AiOutlineMenu } from "react-icons/ai";

const Header = () => {
  const [sideMenu, setSideMenu] = useState(false);

  const handleSideMenu = () => {
    setSideMenu((prev) => !prev);
  };

  return (
    <div className={classes.header}>
      <div className={classes.container}>
        <div className={classes.menu} onClick={handleSideMenu}>
          <AiOutlineMenu />
        </div>
        <div className={classes.logo}>
          <Link to="/">DINGGA</Link>
        </div>
        <Menu sideMenu={sideMenu} setSideMenu={setSideMenu} />
      </div>
    </div>
  );
};

export default Header;
