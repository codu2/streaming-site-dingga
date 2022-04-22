import React from "react";
import { Outlet, useLocation } from "react-router-dom";

import "../App.css";

import LeftSection from "../components/menu/LeftSection";

const Layout = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  return (
    <div className="wrapper">
      <div className="container">
        {path !== "login" && <LeftSection />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
