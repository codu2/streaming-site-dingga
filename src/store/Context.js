import React from "react";

const Context = React.createContext({
  user: null,
  favorite_movie: null,
  favorite_tv: null,
  watchlist_movie: null,
  watchlist_tv: null,
  bookmark: null,
  rated_movie: null,
  rated_tv: null,
  popular_movie: null,
  popular_tv: null,
  loggedInUser: (user) => {},
  logout: () => {},
  getFavoriteMovie: (movie) => {},
  getFavoriteTv: (tv) => {},
  getWatchlistMovie: (movie) => {},
  getWatchlistTv: (tv) => {},
  getRatedMovie: (movie) => {},
  getRatedTv: (tv) => {},
  getPopularMovie: (movie) => {},
  getPopularTv: (tv) => {},
});

export default Context;
