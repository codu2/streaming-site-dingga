import React from "react";
import { Outlet } from "react-router-dom";

import "../App.css";

import LeftSection from "../components/menu/LeftSection";

const Layout = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <LeftSection />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
