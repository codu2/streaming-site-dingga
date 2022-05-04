import React, { useContext } from "react";
import { Link } from "react-router-dom";

import Context from "../../store/Context";

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
        left: "20px",
        top: "-40px",
        color: "#f4f4f4",
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
        right: "20px",
        top: "-40px",
        color: "#f4f4f4",
      }}
      onClick={onClick}
    />
  );
}

const MovieItem = () => {
  const ctx = useContext(Context);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={classes["movie-item"]}>
      <div className={classes["movie-item-top"]}>
        <h1>Popular Movies</h1>
      </div>
      <Slider {...settings} className={classes.items}>
        {ctx.popular_movie &&
          ctx.popular_movie
            .filter((data) => data.backdrop_path)
            .map((movie) => (
              <div key={movie.id}>
                <Link to={`/movie/${movie.id}`}>
                  <div className={classes["movie-item-card"]}>
                    <img
                      src={
                        movie.backdrop_path
                          ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                          : `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      }
                      alt={movie.title}
                      className={classes["movie-item-img"]}
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
