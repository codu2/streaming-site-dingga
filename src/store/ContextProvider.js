import React, { useReducer, useEffect } from "react";

import Context from "./Context";

const initialState = {
  user: null,
  liked: null,
  watchlist: null,
  bookmark: null,
};

const Reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
      };
  }
};

const ContextProvider = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  const loggedInUser = (user) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const contextValue = {
    user: state.user,
    liked: state.liked,
    watchlist: state.watchlist,
    bookmark: state.bookmark,
    loggedInUser,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default ContextProvider;
