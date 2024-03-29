import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./TvPage.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const getOnTheAir = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getAiringToday = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getTopLated = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getPopular = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&include_adult=false`
  );
  return response.data.results;
};

const TvPage = () => {
  const [contentTab, setContentTab] = useState(0);
  const [genreTab, setGenreTab] = useState("10759");
  const [genreTv, setGenreTv] = useState([]);

  useEffect(() => {
    const getGenreTv = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=${genreTab}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
      );
      setGenreTv(response.data.results);
    };
    getGenreTv();
  }, [genreTab]);

  const [on_the_air] = useAsync(getOnTheAir, []);
  const [airing_today] = useAsync(getAiringToday, []);
  const [top_rated] = useAsync(getTopLated, []);
  const [popular] = useAsync(getPopular, []);
  const [trending] = useAsync(getTrending, []);

  const { data: onTheAirData } = on_the_air;
  const { data: airingTodayData } = airing_today;
  const { data: topRatedData } = top_rated;
  const { data: popularData } = popular;
  const { data: trendingData } = trending;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: false,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const tredingSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: false,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={classes.container}>
      <h1>TV Shows</h1>
      <div className={classes.wrapper}>
        <div className={classes["content-box"]}>
          <div className={classes["content-wrapper"]}>
            <div className={classes.trending}>
              <h1>Today's Trending 10</h1>
              {trendingData && (
                <div className={classes.content}>
                  <Slider
                    {...tredingSettings}
                    className={classes["content-list"]}
                  >
                    {trendingData
                      .filter((data, index) => data.backdrop_path && index < 10)
                      .map((data) => (
                        <div key={data.id} className={classes["trending-item"]}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.name}
                          />
                          <Link
                            to={`/tv/${data.id}`}
                            className={classes["content-title"]}
                          >
                            {data.name}
                          </Link>
                        </div>
                      ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
          <div className={classes["content-wrapper"]}>
            <div className={classes["content-tabs"]}>
              <div
                className={`${classes["content-tab"]} ${
                  contentTab === 0 && classes.active
                }`}
                onClick={() => setContentTab(0)}
              >
                On The Air
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  contentTab === 1 && classes.active
                }`}
                onClick={() => setContentTab(1)}
              >
                Airing Today
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  contentTab === 2 && classes.active
                }`}
                onClick={() => setContentTab(2)}
              >
                Top Lated
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  contentTab === 3 && classes.active
                }`}
                onClick={() => setContentTab(3)}
              >
                Popular
              </div>
            </div>
            {contentTab === 0 && onTheAirData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {onTheAirData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/tv/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.name}
                          />
                          <div className={classes["content-title"]}>
                            {data.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
            {contentTab === 1 && airingTodayData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {airingTodayData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/tv/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.name}
                          />
                          <div className={classes["content-title"]}>
                            {data.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
            {contentTab === 2 && topRatedData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {topRatedData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/tv/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.name}
                          />
                          <div className={classes["content-title"]}>
                            {data.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
            {contentTab === 3 && popularData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {popularData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/tv/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.name}
                          />
                          <div className={classes["content-title"]}>
                            {data.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
          </div>
          <div className={classes["content-wrapper"]}>
            <div className={classes["content-genre-tabs"]}>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10759" && classes.active
                }`}
                onClick={() => setGenreTab("10759")}
              >
                Action/Adventure
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "16" && classes.active
                }`}
                onClick={() => setGenreTab("16")}
              >
                Animation
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "35" && classes.active
                }`}
                onClick={() => setGenreTab("35")}
              >
                Comedy
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "80|9648" && classes.active
                }`}
                onClick={() => setGenreTab("80|9648")}
              >
                Crime/Mystery
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "18" && classes.active
                }`}
                onClick={() => setGenreTab("18")}
              >
                Drama
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10751" && classes.active
                }`}
                onClick={() => setGenreTab("10751")}
              >
                Family
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10762" && classes.active
                }`}
                onClick={() => setGenreTab("10762")}
              >
                Kids
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10763" && classes.active
                }`}
                onClick={() => setGenreTab("10763")}
              >
                News
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10764" && classes.active
                }`}
                onClick={() => setGenreTab("10764")}
              >
                Reality
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "99" && classes.active
                }`}
                onClick={() => setGenreTab("99")}
              >
                Documentary
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10767" && classes.active
                }`}
                onClick={() => setGenreTab("10767")}
              >
                Talk
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10768" && classes.active
                }`}
                onClick={() => setGenreTab("10768")}
              >
                War/Politics
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10765" && classes.active
                }`}
                onClick={() => setGenreTab("10765")}
              >
                Sci-Fi/Fantasy
              </div>
            </div>
            {genreTv && (
              <div className={classes.content}>
                <Slider {...settings} className={classes["content-list"]}>
                  {genreTv
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/tv/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.name}
                          />
                          <div className={classes["content-title"]}>
                            {data.name}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvPage;
