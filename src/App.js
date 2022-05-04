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
import Search from "./pages/Search";
import Profile from "./components/account/Profile";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

function App() {
  const location = useLocation();
  const ctx = useContext(Context);

  const getPopular = async () => {
    try {
      const getPopularMovie = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
      );
      ctx.getPopularMovie(getPopularMovie.data.results);

      const getPopularTv = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
      );
      ctx.getPopularTv(getPopularTv.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getFavorite = async () => {
    try {
      const getFavoriteMovie = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      ctx.getFavoriteMovie(getFavoriteMovie.data.results);

      const getFavoriteTv = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite/tv?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      ctx.getFavoriteTv(getFavoriteTv.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getWatchlist = async () => {
    try {
      const getWatchListMovie = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      ctx.getWatchlistMovie(getWatchListMovie.data.results);

      const getWatchListTv = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist/tv?api_key=${API_KEY}&session_id=${SESSION_ID}`
      );
      ctx.getWatchlistTv(getWatchListTv.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  const getRated = async () => {
    try {
      const getRatedMovie = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/rated/movies?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc&page=1&session_id=${SESSION_ID}`
      );
      ctx.getRatedMovie(getRatedMovie.data.results);

      const getRatedTv = await axios.get(
        `https://api.themoviedb.org/3/account/${ctx.user.id}/rated/tv?api_key=${API_KEY}&language=en-US&sort_by=created_at.asc&page=1&session_id=${SESSION_ID}`
      );
      ctx.getRatedTv(getRatedTv.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  useEffect(() => {
    if (ctx.user) {
      getFavorite();
      getWatchlist();
      getRated();
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
        <Route path="account/:id/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
