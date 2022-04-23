import React, { useReducer, useEffect } from "react";

import Context from "./Context";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  liked: null,
  watchlist: null,
  bookmark: null,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        user: action.payload,
        liked: null,
        watchlist: null,
        bookmark: null,
      };
    case "LOGOUT":
      return {
        user: null,
        liked: null,
        watchlist: null,
        bookmark: null,
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

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const contextValue = {
    user: state.user,
    liked: state.liked,
    watchlist: state.watchlist,
    bookmark: state.bookmark,
    loggedInUser,
    logout,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
