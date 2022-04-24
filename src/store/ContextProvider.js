import React, { useReducer, useEffect } from "react";

import Context from "./Context";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  favorite_movie: null,
  favorite_tv: null,
  watchlist_movie: null,
  watchlist_tv: null,
  bookmark: null,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        favorite_movie: null,
        favorite_tv: null,
        watchlist_movie: null,
        watchlist_tv: null,
        bookmark: null,
      };
    case "LOGOUT":
      return {
        user: null,
        favorite_movie: null,
        favorite_tv: null,
        watchlist_movie: null,
        watchlist_tv: null,
        bookmark: null,
      };
    case "FAVORITE_MOVIE":
      return {
        user: state.user,
        favorite_movie: action.payload,
        favorite_tv: state.favorite_tv,
        watchlist_movie: state.watchlist_movie,
        watchlist_tv: state.watchlist_tv,
        bookmark: state.bookmark,
      };
    case "FAVORITE_TV":
      return {
        user: state.user,
        favorite_movie: state.favorite_movie,
        favorite_tv: action.payload,
        watchlist_movie: state.watchlist_movie,
        watchlist_tv: state.watchlist_tv,
        bookmark: state.bookmark,
      };
    case "WATCHLIST_MOVIE":
      return {
        user: state.user,
        favorite_movie: state.favorite_movie,
        favorite_tv: state.favorite_tv,
        watchlist_movie: action.payload,
        watchlist_tv: state.watchlist_tv,
        bookmark: state.bookmark,
      };
    case "WATCHLIST_TV":
      return {
        user: state.user,
        favorite_movie: state.favorite_movie,
        favorite_tv: state.favorite_tv,
        watchlist_movie: state.watchlist_movie,
        watchlist_tv: action.payload,
        bookmark: state.bookmark,
      };

    default:
      return state;
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const loggedInUser = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const getFavoriteMovie = (favorite) => {
    dispatch({ type: "FAVORITE_MOVIE", payload: favorite });
  };

  const getFavoriteTv = (favorite) => {
    dispatch({ type: "FAVORITE_TV", payload: favorite });
  };

  const getWatchlistMovie = (watchlist) => {
    dispatch({ type: "WATCHLIST_MOVIE", payload: watchlist });
  };

  const getWatchlistTv = (watchlist) => {
    dispatch({ type: "WATCHLIST_TV", payload: watchlist });
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const contextValue = {
    user: state.user,
    favorite_movie: state.favorite_movie,
    favorite_tv: state.favorite_tv,
    watchlist_movie: state.watchlist_movie,
    watchlist_tv: state.watchlist_tv,
    bookmark: state.bookmark,
    loggedInUser,
    logout,
    getFavoriteMovie,
    getFavoriteTv,
    getWatchlistMovie,
    getWatchlistTv,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
