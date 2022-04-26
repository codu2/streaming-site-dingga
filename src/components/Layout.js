import React from "react";
import { Outlet } from "react-router-dom";

import "../App.css";

import Header from "../components/menu/Header";

const Layout = () => {
  return (
    <div className="wrapper">
      <div className="container">
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
