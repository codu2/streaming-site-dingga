import React from "react";
import { useLocation } from "react-router-dom";

import MoviePage from "../components/category/MoviePage";

const Category = () => {
  const location = useLocation();
  const media = location.pathname.split("/")[1];

  return <>{media === "movie" && <MoviePage />}</>;
};

export default Category;
