import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./DetailGenre.module.css";
import { MdOutlineArrowForwardIos } from "react-icons/md";

const API_KEY = process.env.REACT_APP_API_KEY;

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <MdOutlineArrowForwardIos
      className={`${className} ${classes["slider-btn"]}`}
      style={{
        ...style,
        display: "block",
        top: "50%",
        right: "8px",
        color: "#f4f4f4",
        width: "48px",
        height: "48px",
        borderRadius: "50%",
      }}
      onClick={onClick}
    />
  );
}

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.genre}>
        Genre : <span>{filteredGenre[0] && filteredGenre[0].name}</span>
      </h1>
      <div className={classes["genre-result"]}>
        {genreMovie.length !== 0 && (
          <div className={classes["genre-content"]}>
            <h1>Movies</h1>
            <Slider {...settings} className={classes["genre-list"]}>
              {genreMovie &&
                genreMovie.map((movie) => (
                  <div key={movie.id} className={classes["genre-list-item"]}>
                    <img
                      src={
                        movie.poster_path
                          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                          : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                      }
                      alt={movie.title}
                    />
                    <Link to={`/movie/${movie.id}`} className={classes.link}>
                      <div className={classes["genre-title"]}>
                        {movie.title}
                      </div>
                    </Link>
                  </div>
                ))}
            </Slider>
          </div>
        )}
        {genreTv.length !== 0 && (
          <div className={classes["genre-content"]}>
            <h1>TV Shows</h1>
            <Slider {...settings} className={classes["genre-list"]}>
              {genreTv.map((tv) => (
                <div key={tv.id} className={classes["genre-list-item"]}>
                  <img
                    src={
                      tv.poster_path
                        ? `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                        : `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`
                    }
                    alt={tv.name}
                  />
                  <Link to={`/tv/${tv.id}`} className={classes.link}>
                    <div className={classes["genre-title"]}>{tv.name}</div>
                  </Link>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailGenre;
