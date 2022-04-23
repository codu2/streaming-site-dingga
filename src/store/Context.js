import React from "react";

const Context = React.createContext({
  user: null,
  liked: null,
  watchlist: null,
  bookmark: null,
  loggedInUser: (user) => {},
  logout: () => {},
});

export default Context;
