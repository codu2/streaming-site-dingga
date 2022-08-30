import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./DetailPerson.module.css";
import { BsThreeDots, BsMouse } from "react-icons/bs";
import { MdClose } from "react-icons/md";

const API_KEY = process.env.REACT_APP_API_KEY;

const DetailPerson = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [moreBtn, setMoreBtn] = useState(false);

  //Andrew Garfield
  const getPerson = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${path}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

  const getPersonCast = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${path}/movie_credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast;
  };

  const [person] = useAsync(getPerson, []);
  const [cast] = useAsync(getPersonCast, []);

  const { loading, data, error } = person;
  const { data: castData } = cast;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 8,
    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 610,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img
          src={
            data.profile_path &&
            `https://image.tmdb.org/t/p/w500${data.profile_path}`
          }
          alt={data.profile_path && data.name}
          className={classes["content-img"]}
        />
        <div className={classes.content}>
          <div className={classes.name}>{data.name}</div>
          <div className={classes.birth}>
            <div className={classes.birthday}>{data.birthday}</div>
            <div className={classes["place-birth"]}>{data.place_of_birth}</div>
          </div>
          <div
            className={`${classes.biography} ${moreBtn ? classes.more : null}`}
          >
            {data.biography}
          </div>
          <div className={classes["btn-wrapper"]}>
            <button
              type="button"
              className={classes["more-btn"]}
              onClick={() => setMoreBtn((prev) => !prev)}
            >
              {moreBtn ? <MdClose /> : <BsThreeDots />}
            </button>
          </div>
        </div>
      </div>
      <div className={classes.cast}>
        <div className={classes["slider-icon"]}>
          <BsMouse /> Moving Slides
        </div>
        <Slider {...settings}>
          {castData &&
            castData
              .filter((data) => data.poster_path || data.backdrop_path)
              .map((data) => (
                <div className={classes["cast-item"]} key={data.id}>
                  <img
                    src={
                      data.poster_path
                        ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                        : data.backdrop_path &&
                          `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                    }
                    alt={
                      data.poster_path && data.title ? data.title : data.name
                    }
                    className={classes["cast-img"]}
                  />
                  <div className={classes["cast-title"]}>
                    <Link to={`/${data.title ? "movie" : "tv"}/${data.id}`}>{`${
                      data.title ? data.title : data.name
                    } (${
                      data.first_air_date
                        ? `${new Date(data.first_air_date).getFullYear()}~`
                        : new Date(data.release_date).getFullYear()
                    })`}</Link>
                  </div>
                </div>
              ))}
        </Slider>
      </div>
    </div>
  );
};

export default DetailPerson;
