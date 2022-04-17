import React from "react";
import { useLocation } from "react-router-dom";

import MoviePage from "../components/category/MoviePage";
import TvPage from "../components/category/TvPage";

const Category = () => {
  const location = useLocation();
  const media = location.pathname.split("/")[1];

  return (
    <>
      {media === "movie" && <MoviePage />}
      {media === "tv" && <TvPage />}
    </>
  );
};

export default Category;
