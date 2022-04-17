import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./MoviePage.module.css";
import { BsArrowLeftCircle, BsArrowRightCircle } from "react-icons/bs";

const API_KEY = process.env.REACT_APP_API_KEY;

const MoviePage = () => {
  const [topRatedMovie, setTopRatedMovie] = useState({});

  const getTopRated = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`
    );
    setTopRatedMovie(response.data.results[0]);
    return response.data.results;
  };

  const getNowPlaying = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  };

  const getPopular = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    return response.data.results;
  };

  const getData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/581734?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

  const [top_rated] = useAsync(getTopRated, []);
  const [now_playing] = useAsync(getNowPlaying, []);
  const [popular] = useAsync(getPopular, []);
  const [nomadland] = useAsync(getData, []);

  const { data: topRatedData } = top_rated;
  const { data: nowPlayingData } = now_playing;
  const { data: popularData } = popular;
  const { data: nomadlandData } = nomadland;

  console.log(nomadlandData);

  return (
    <div className={classes.container}>
      <h1>Movie</h1>
      <div className={classes.wrapper}>
        <div className={classes["content-box"]}>
          {topRatedData && (
            <div className={classes["content"]}>
              <h1>Top Rated</h1>
              <div className={classes["content-wrapper"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {topRatedData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/movie/${data.id}`}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                          alt={data.title}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            </div>
          )}
          {nowPlayingData && (
            <div className={classes["content"]}>
              <h1>Now Playing</h1>
              <div className={classes["content-wrapper"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {nowPlayingData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/movie/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.title}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            </div>
          )}
          {popularData && (
            <div className={classes["content"]}>
              <h1>Popular</h1>
              <div className={classes["content-wrapper"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {popularData.map((data) => (
                    <li key={data.id} className={classes["content-item"]}>
                      <Link to={`/movie/${data.id}`}>
                        <img
                          src={
                            data.poster_path
                              ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                              : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                          }
                          alt={data.title}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
                <BsArrowRightCircle className={classes["right-button"]} />
              </div>
            </div>
          )}
        </div>
        <div className={classes["side-box"]}>
          {nomadlandData && (
            <div className={classes["side-content"]}>
              <h1>Watching Movie</h1>
              <div className={classes.watching}>
                <img
                  src={
                    nomadlandData.poster_path
                      ? `https://image.tmdb.org/t/p/w500${nomadlandData.poster_path}`
                      : `https://image.tmdb.org/t/p/w500${nomadlandData.backdrop_path}`
                  }
                  alt={nomadlandData.title}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MoviePage;
