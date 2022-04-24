import React from "react";

const Context = React.createContext({
  user: null,
  favorite_movie: null,
  favorite_tv: null,
  watchlist_movie: null,
  watchlist_tv: null,
  bookmark: null,
  loggedInUser: (user) => {},
  logout: () => {},
  getFavoriteMovie: (movie) => {},
  getFavoriteTv: (tv) => {},
  getWatchlistMovie: (movie) => {},
  getWatchlistTv: (tv) => {},
});

export default Context;
