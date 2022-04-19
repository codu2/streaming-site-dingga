import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./MovieItem.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowBack
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        left: "0",
        top: "-20px",
        color: "#d67b30",
      }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowForward
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        right: "0",
        top: "-20px",
        color: "#d67b30",
      }}
      onClick={onClick}
    />
  );
}

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
  );
  return response.data.results;
};

const MovieItem = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  const settings = {
    dots: false, // 점은 안 보이게
    infinite: true, // 무한 슬라이더
    speed: 500,
    slidesToShow: 5, //5장씩 보이게 해주세요
    slidesToScroll: 5, //1장씩 넘어가세요
    draggable: false, // 드래그 안되게
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={classes["movie-item"]}>
      <div className={classes["movie-item-top"]}>
        <h1>Popular Movies</h1>
      </div>
      <Slider {...settings} className={classes.item}>
        {data.map((movie) => (
          <div key={movie.id}>
            <Link to={`/movie/${movie.id}`}>
              <div className={classes["movie-item-card"]}>
                <img
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  }
                  alt={movie.title}
                />
                <div className={classes["movie-title"]}>{movie.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MovieItem;
