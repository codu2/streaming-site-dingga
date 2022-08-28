import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import Context from "../../store/Context";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./TvShowItem.module.css";
import { AiFillTrophy } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;

const TvShowItem = () => {
  const ctx = useContext(Context);

  const getPopular = async () => {
    try {
      const getPopularTv = await axios.get(
        `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
      );
      ctx.getPopularTv(getPopularTv.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getPopular();
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes["tv-item"]}>
      <div className={classes["tv-item-top"]}>
        <h1>
          <AiFillTrophy />
          Popular TV Show
        </h1>
      </div>
      <Slider {...settings} className={classes.items}>
        {ctx.popular_tv &&
          ctx.popular_tv
            .filter((data, index) => data.backdrop_path && index < 10)
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
