import React, { useReducer, useEffect } from "react";

import Context from "./Context";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  favorite_movie: null,
  favorite_tv: null,
  watchlist_movie: null,
  watchlist_tv: null,
  bookmark: null,
  rated_movie: null,
  rated_tv: null,
  popular_movie: null,
  popular_tv: null,
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
        rated_movie: null,
        rated_tv: null,
        popular_movie: null,
        popular_tv: null,
      };
    case "LOGOUT":
      return {
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
      };
    case "FAVORITE_MOVIE":
      return {
        ...state,
        favorite_movie: action.payload,
      };
    case "FAVORITE_TV":
      return {
        ...state,
        favorite_tv: action.payload,
      };
    case "WATCHLIST_MOVIE":
      return {
        ...state,
        watchlist_movie: action.payload,
      };
    case "WATCHLIST_TV":
      return {
        ...state,
        watchlist_tv: action.payload,
      };
    case "RATED_MOVIE":
      return {
        ...state,
        rated_movie: action.payload,
      };
    case "RATED_TV":
      return {
        ...state,
        rated_tv: action.payload,
      };
    case "POPULAR_MOVIE":
      return {
        ...state,
        popular_movie: action.payload,
      };
    case "POPULAR_TV":
      return {
        ...state,
        popular_tv: action.payload,
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

  const getRatedMovie = (rated) => {
    dispatch({ type: "RATED_MOVIE", payload: rated });
  };

  const getRatedTv = (rated) => {
    dispatch({ type: "RATED_TV", payload: rated });
  };

  const getPopularMovie = (popular) => {
    dispatch({ type: "POPULAR_MOVIE", payload: popular });
  };

  const getPopularTv = (popular) => {
    dispatch({ type: "POPULAR_TV", payload: popular });
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
    rated_movie: state.rated_movie,
    rated_tv: state.rated_tv,
    popular_movie: state.popular_movie,
    popular_tv: state.popular_tv,
    loggedInUser,
    logout,
    getFavoriteMovie,
    getFavoriteTv,
    getWatchlistMovie,
    getWatchlistTv,
    getRatedMovie,
    getRatedTv,
    getPopularMovie,
    getPopularTv,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
