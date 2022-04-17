import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./DetailGenre.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const DetailGenre = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [genresData, setGenresData] = useState([]);
  const [genreMovie, setGenreMovie] = useState([]);
  const [genreTv, setGenreTv] = useState([]);
  const [filteredGenre, setFilteredGenre] = useState([]);

  const getGenres = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    );
    setGenresData(response.data.genres);
  };

  const getGenreMovie = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${path}&with_watch_monetization_types=flatrate`
    );
    setGenreMovie(response.data.results);
  };

  const getGenreTv = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${path}&with_watch_monetization_types=flatrate`
    );
    setGenreTv(response.data.results);
  };

  const [genres] = useAsync(getGenres, []);
  const [movie] = useAsync(getGenreMovie, []);
  const [tv] = useAsync(getGenreTv, []);

  useEffect(() => {
    if (genresData) {
      const data = genresData.filter((genre) => genre.id === Number(path));
      setFilteredGenre(data);
    }
  }, [path, genresData]);

  return (
    <div className={classes.container}>
      <h1 className={classes.genre}>
        Genre : <span>{filteredGenre[0] && filteredGenre[0].name}</span>
      </h1>
      <div className={classes["genre-result"]}>
        {genreMovie.length !== 0 && (
          <div className={classes["genre-content"]}>
            <h1>Movie</h1>
            <ul>
              {genreMovie &&
                genreMovie.map((movie) => (
                  <li key={movie.id} className={classes["genre-content-item"]}>
                    <Link to={`/movie/${movie.id}`}>
                      <img
                        src={
                          movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                            : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                        }
                        alt={movie.original_title}
                      />
                    </Link>
                    <div className={classes["genre-title"]}>
                      {movie.original_title}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        )}
        {genreTv.length !== 0 && (
          <div className={classes["genre-content"]}>
            <h1>TV Show</h1>
            <ul>
              {genreTv.map((tv) => (
                <li key={tv.id} className={classes["genre-content-item"]}>
                  <Link to={`/tv/${tv.id}`}>
                    <img
                      src={
                        tv.poster_path
                          ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                          : `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`
                      }
                      alt={tv.original_name}
                    />
                  </Link>
                  <div className={classes["genre-title"]}>
                    {tv.original_name}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailGenre;
