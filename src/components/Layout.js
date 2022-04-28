import React from "react";
import { Outlet } from "react-router-dom";

import "../App.css";

import Header from "../components/menu/Header";
import Footer from "./footer/Footer";

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
        <footer>
          <Footer />
        </footer>
      </div>
    </div>
  );
};

export default Layout;
