import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import "./App.css";

import Homepage from "./pages/Homepage";
import Layout from "./components/Layout";
import Detail from "./components/detail/Detail";
import DetailGenre from "./components/detail/DetailGenre";
import Category from "./pages/Category";
import DetailPerson from "./components/detail/DetailPerson";
import Favorite from "./components/account/Favorite";
import WatchList from "./components/account/WatchList";
import Login from "./components/account/Login";

function App() {
  const location = useLocation();

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/movie" element={<Category />} />
        <Route path="/tv" element={<Category />} />
        <Route path="/movie/:id" element={<Detail key={location.pathname} />} />
        <Route path="/tv/:id" element={<Detail key={location.pathname} />} />
        <Route path="/person/:id" element={<DetailPerson />} />
        <Route path="/genre/:id" element={<DetailGenre />} />
        <Route path="/account/:id/favorite" element={<Favorite />} />
        <Route path="/account/:id/watchlist" element={<WatchList />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
