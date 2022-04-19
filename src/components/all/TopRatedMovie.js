import React from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./AllSection.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowBack
      className={classes["prev-button"]}
      style={{
        ...style,
        display: "block",
        background: "none",
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
        right: "10px",
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
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
  );
  return response.data.results;
};

const TopRatedTvShow = () => {
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
    <div className={classes["all-section"]}>
      <div className={classes["item-top"]}>
        <h1>Movie: Now Playing</h1>
      </div>
      <Slider {...settings} className={classes.items}>
        {data.map((item) => (
          <div key={item.id}>
            <Link to={`/movie/${item.id}`}>
              <div className={classes["item-card"]}>
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                  }
                  alt={item.title}
                />
                <div className={classes["item-title"]}>{item.title}</div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default TopRatedTvShow;
