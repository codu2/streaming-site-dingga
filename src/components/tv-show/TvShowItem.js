import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./TvShowItem.module.css";
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

const API_KEY = process.env.REACT_APP_API_KEY;

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const TvShowItem = () => {
  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

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
    <div className={classes["tv-item"]}>
      <div className={classes["tv-item-top"]}>
        <h1>Popular TV Show</h1>
      </div>
      <Slider {...settings} className={classes.items}>
        {data
          .filter((data) => data.backdrop_path)
          .map((tv) => (
            <div key={tv.id}>
              <Link to={`/tv/${tv.id}`}>
                <div className={classes["tv-item-card"]}>
                  <img
                    src={
                      tv.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${tv.backdrop_path}`
                        : `https://image.tmdb.org/t/p/w500${tv.poster_path}`
                    }
                    alt={tv.name}
                    className={classes["tv-item-img"]}
                  />
                  <div className={classes["tv-title"]}>{tv.name}</div>
                </div>
              </Link>
            </div>
          ))}
      </Slider>
    </div>
  );
};

export default TvShowItem;
