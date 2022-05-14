import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./MoviePage.module.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsArrowLeftCircle
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        color: "#f4f4f4",
        width: "28px",
        height: "28px",
        left: "0",
      }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsArrowRightCircle
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        color: "#f4f4f4",
        width: "28px",
        height: "28px",
        right: "0",
      }}
      onClick={onClick}
    />
  );
}

const API_KEY = process.env.REACT_APP_API_KEY;

const getTopRated = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getNowPlaying = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getPopular = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
  );
  return response.data.results;
};

const getTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&include_adult=false`
  );
  return response.data.results;
};

const MoviePage = () => {
  const [contentTab, setContentTab] = useState(0);
  const [genreTab, setGenreTab] = useState("28|32");
  const [genreMovie, setGenreMovie] = useState([]);

  useEffect(() => {
    const getGenreMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genreTab}&page=1&include_adult=false&primary_release_date.gte=2000-01-01&with_original_language=en|ko`
      );
      setGenreMovie(response.data.results);
    };
    getGenreMovie();
  }, [genreTab]);

  const [top_rated] = useAsync(getTopRated, []);
  const [now_playing] = useAsync(getNowPlaying, []);
  const [popular] = useAsync(getPopular, []);
  const [trending] = useAsync(getTrending, []);

  const { data: topRatedData } = top_rated;
  const { data: nowPlayingData } = now_playing;
  const { data: popularData } = popular;
  const { data: trendingData } = trending;

  const tab0Css = `${classes["content-tab"]} ${
    contentTab === 0 && classes.active
  }`;
  const tab1Css = `${classes["content-tab"]} ${
    contentTab === 1 && classes.active
  }`;
  const tab2Css = `${classes["content-tab"]} ${
    contentTab === 2 && classes.active
  }`;

  const settings = {
    dots: false, // 점은 안 보이게
    infinite: true, // 무한 슬라이더
    speed: 500,
    slidesToShow: 3, //3장씩 보이게 해주세요
    slidesToScroll: 3, //3장씩 넘어가세요
    draggable: false, // 드래그 안되게
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
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
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    draggable: true,
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
      <h1>Movies</h1>
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
                          <Link to={`/movie/${data.id}`}>
                            <img
                              src={
                                data.backdrop_path
                                  ? `https://image.tmdb.org/t/p/w1280${data.backdrop_path}`
                                  : `https://image.tmdb.org/t/p/w1280${data.poster_path}`
                              }
                              alt={data.title}
                            />
                            <div className={classes["content-title"]}>
                              {data.title}
                            </div>
                          </Link>
                        </div>
                      ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
          <div className={classes["content-wrapper"]}>
            <div className={classes["content-genre-tabs"]}>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "28|32" && classes.active
                }`}
                onClick={() => setGenreTab("28|32")}
              >
                Action/Adventure
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
                  genreTab === "27" && classes.active
                }`}
                onClick={() => setGenreTab("27")}
              >
                Horror
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "10749" && classes.active
                }`}
                onClick={() => setGenreTab("10749")}
              >
                Romance
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "878" && classes.active
                }`}
                onClick={() => setGenreTab("878")}
              >
                Sciencs Fiction
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "53" && classes.active
                }`}
                onClick={() => setGenreTab("53")}
              >
                Suspence/Thriller
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
                  genreTab === "16" && classes.active
                }`}
                onClick={() => setGenreTab("16")}
              >
                Animation
              </div>
              <div
                className={`${classes["content-tab"]} ${
                  genreTab === "14" && classes.active
                }`}
                onClick={() => setGenreTab("14")}
              >
                Fantasy
              </div>
            </div>
            {genreMovie && (
              <div className={classes.content}>
                <Slider {...settings} className={classes["content-list"]}>
                  {genreMovie
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/movie/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.title}
                          />
                          <div className={classes["content-title"]}>
                            {data.title}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
          </div>
          <div className={classes["content-wrapper"]}>
            <div className={classes["content-tabs"]}>
              <div className={tab0Css} onClick={() => setContentTab(0)}>
                Top Rated
              </div>
              <div className={tab1Css} onClick={() => setContentTab(1)}>
                Now Playing
              </div>
              <div className={tab2Css} onClick={() => setContentTab(2)}>
                Popular
              </div>
            </div>
            {contentTab === 0 && topRatedData && (
              <div className={classes.content}>
                <Slider {...settings} className={classes["content-list"]}>
                  {topRatedData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/movie/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.title}
                          />
                          <div className={classes["content-title"]}>
                            {data.title}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
            {contentTab === 1 && nowPlayingData && (
              <div className={classes.content}>
                <Slider {...settings} className={classes["content-list"]}>
                  {nowPlayingData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <div key={data.id} className={classes["content-item"]}>
                        <Link to={`/movie/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.title}
                          />
                          <div className={classes["content-title"]}>
                            {data.title}
                          </div>
                        </Link>
                      </div>
                    ))}
                </Slider>
              </div>
            )}
            {contentTab === 2 && popularData && (
              <div className={classes.content}>
                <Slider {...settings} className={classes["content-list"]}>
                  {popularData
                    .filter((data) => data.backdrop_path)
                    .map((data) => (
                      <li key={data.id} className={classes["content-item"]}>
                        <Link to={`/movie/${data.id}`}>
                          <img
                            src={
                              data.backdrop_path
                                ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                                : `https://image.tmdb.org/t/p/w500${data.poster_path}`
                            }
                            alt={data.title}
                          />
                          <div className={classes["content-title"]}>
                            {data.title}
                          </div>
                        </Link>
                      </li>
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

export default MoviePage;
