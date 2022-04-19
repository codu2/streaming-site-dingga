import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./TvPage.module.css";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsSkipStartCircle,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <BsArrowLeftCircle
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        color: "#d67b30",
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
        color: "#d67b30",
        width: "28px",
        height: "28px",
        right: "0",
      }}
      onClick={onClick}
    />
  );
}

const API_KEY = process.env.REACT_APP_API_KEY;

const getOnTheAir = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/on_the_air?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

const getAiringToday = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/airing_today?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

const getTopLated = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

const getPopular = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
  );
  return response.data.results;
};

const getTrending = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}&include_adult=false`
  );
  return response.data.results;
};

const getData = async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/110382?api_key=${API_KEY}&language=en-US`
  );
  return response.data;
};

const TvPage = () => {
  const [contentTab, setContentTab] = useState(0);

  const [on_the_air] = useAsync(getOnTheAir, []);
  const [airing_today] = useAsync(getAiringToday, []);
  const [top_rated] = useAsync(getTopLated, []);
  const [popular] = useAsync(getPopular, []);
  const [trending] = useAsync(getTrending, []);
  const [pachinko] = useAsync(getData, []);

  const { data: onTheAirData } = on_the_air;
  const { data: airingTodayData } = airing_today;
  const { data: topRatedData } = top_rated;
  const { data: popularData } = popular;
  const { data: trendingData } = trending;
  const { data: pachinkoData } = pachinko;

  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchResult(response.data.results);
    }
  };

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
    <div className={classes.container}>
      <h1>TV Shows</h1>
      <div className={classes.wrapper}>
        <div className={classes["content-box"]}>
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
                  {onTheAirData.map((data, index) => (
                    <div key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                        {index < 3 && (
                          <span className={classes.ranking}>{index + 1}</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            {contentTab === 1 && airingTodayData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {airingTodayData.map((data, index) => (
                    <div key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                        {index < 3 && (
                          <span className={classes.ranking}>{index + 1}</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            {contentTab === 2 && topRatedData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {topRatedData.map((data, index) => (
                    <div key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                        {index < 3 && (
                          <span className={classes.ranking}>{index + 1}</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
            {contentTab === 3 && popularData && (
              <div className={classes["content"]}>
                <Slider {...settings} className={classes["content-list"]}>
                  {popularData.map((data, index) => (
                    <div key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                        {index < 3 && (
                          <span className={classes.ranking}>{index + 1}</span>
                        )}
                      </Link>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
          <div className={classes["content-wrapper"]}>
            <div className={classes.trending}>
              <h1>Today's Trending</h1>
              {trendingData && (
                <div className={classes.content}>
                  <Slider {...settings} className={classes["content-list"]}>
                    {trendingData
                      .filter((item, index) => index < 10)
                      .map((data, index) => (
                        <div key={data.id} className={classes["content-item"]}>
                          <Link to={`/tv/${data.id}`}>
                            <img
                              src={
                                data.poster_path
                                  ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                                  : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                              }
                              alt={data.name}
                            />
                            {index < 3 && (
                              <span className={classes.ranking}>
                                {index + 1}
                              </span>
                            )}
                          </Link>
                        </div>
                      ))}
                  </Slider>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className={classes["side-box"]}>
          <div className={classes["side-content"]}>
            <h1>Search for TV Show Title</h1>
            <div className={classes["search-input"]}>
              <input type="text" placeholder="Search" onChange={handleSearch} />
              <AiOutlineSearch className={classes["search-icon"]} />
            </div>
            <div className={classes["search-result"]}>
              {query && searchResult && (
                <ul>
                  {searchResult.map((result) => (
                    <li>
                      <Link to={`/tv/${result.id}`} className={classes.link}>
                        {result.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {!query && <div>Please enter a search term...</div>}
            </div>
          </div>
          {pachinkoData && (
            <div className={classes["side-content"]}>
              <div className={classes.watching}>
                <h1>Watching Movie</h1>
                <div className={classes["watching-img"]}>
                  <img
                    src={
                      pachinkoData.backdrop_path
                        ? `https://image.tmdb.org/t/p/w500${pachinkoData.backdrop_path}`
                        : `https://image.tmdb.org/t/p/w500${pachinkoData.poster_path}`
                    }
                    alt={pachinkoData.name}
                  />
                  <span className={classes["watching-title"]}>
                    {pachinkoData.name}
                  </span>
                  <BsSkipStartCircle className={classes["watching-icon"]} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TvPage;
