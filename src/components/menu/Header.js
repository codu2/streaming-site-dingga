import React, { useState } from "react";

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
      <div className={classes.menu} onClick={handleSideMenu}>
        <AiOutlineMenu />
      </div>
      <div className={classes.logo}>DINGGA</div>
      <Menu sideMenu={sideMenu} />
    </div>
  );
};

export default Header;
