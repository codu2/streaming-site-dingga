import React from "react";

import Home from "../components/home/Home";
import MovieItem from "../components/movie/MovieItem";
import TvShowItem from "../components/tv-show/TvShowItem";

const Homepage = () => {
  return (
    <>
      <Home />
      <MovieItem />
      <TvShowItem />
    </>
  );
};

export default Homepage;
