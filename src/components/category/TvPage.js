import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./TvPage.module.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

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

const TvPage = () => {
  const [contentTab, setContentTab] = useState(0);

  const [on_the_air] = useAsync(getOnTheAir, []);
  const [airing_today] = useAsync(getAiringToday, []);
  const [top_rated] = useAsync(getTopLated, []);
  const [popular] = useAsync(getPopular, []);

  const { data: onTheAirData } = on_the_air;
  const { data: airingTodayData } = airing_today;
  const { data: topRatedData } = top_rated;
  const { data: popularData } = popular;

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
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {onTheAirData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            )}
            {contentTab === 1 && airingTodayData && (
              <div className={classes["content"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {airingTodayData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            )}
            {contentTab === 2 && topRatedData && (
              <div className={classes["content"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {topRatedData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            )}
            {contentTab === 3 && popularData && (
              <div className={classes["content"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {popularData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/tv/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.name}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TvPage;