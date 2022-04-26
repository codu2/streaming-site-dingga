import React, { useContext, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";

import axios from "axios";
import Context from "./store/Context";

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

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

function App() {
  const location = useLocation();
  const ctx = useContext(Context);

  const getData = async () => {
    try {
      const getFavoriteMovie = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      const getFavoriteTv = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite/tv?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      const getWatchListMovie = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      const getWatchListTv = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist/tv?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );

      ctx.getFavoriteMovie(getFavoriteMovie.data.results);
      ctx.getFavoriteTv(getFavoriteTv.data.results);
      ctx.getWatchlistMovie(getWatchListMovie.data.results);
      ctx.getWatchlistTv(getWatchListTv.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (ctx.user) {
      getData();
    }
  }, [ctx.user]);

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
