import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./MoviePage.module.css";
import {
  BsArrowLeftCircle,
  BsArrowRightCircle,
  BsSkipStartCircle,
} from "react-icons/bs";
import { AiOutlineSearch } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;

const MoviePage = () => {
  const [contentTab, setContentTab] = useState(0);
  const [genreTab, setGenreTab] = useState("28|32");
  const [genreMovie, setGenreMovie] = useState([]);

  const getTopRated = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`
    );
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

  useEffect(() => {
    const getGenreMovie = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&include_adult=false&with_genres=${genreTab}`
      );
      setGenreMovie(response.data.results);
    };
    getGenreMovie();
  }, [genreTab]);

  const [top_rated] = useAsync(getTopRated, []);
  const [now_playing] = useAsync(getNowPlaying, []);
  const [popular] = useAsync(getPopular, []);
  const [nomadland] = useAsync(getData, []);

  const { data: topRatedData } = top_rated;
  const { data: nowPlayingData } = now_playing;
  const { data: popularData } = popular;
  const { data: nomadlandData } = nomadland;

  const [searchResult, setSearchResult] = useState([]);
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    setQuery(e.target.value);
    if (e.target.value !== "") {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${e.target.value}&page=1&include_adult=false`
      );
      setSearchResult(response.data.results);
    }
  };

  const tab0Css = `${classes["content-tab"]} ${
    contentTab === 0 && classes.active
  }`;
  const tab1Css = `${classes["content-tab"]} ${
    contentTab === 1 && classes.active
  }`;
  const tab2Css = `${classes["content-tab"]} ${
    contentTab === 2 && classes.active
  }`;

  return (
    <div className={classes.container}>
      <h1>Movies</h1>
      <div className={classes.wrapper}>
        <div className={classes["content-box"]}>
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
              <div className={classes["content"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {genreMovie.map((data) => (
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
              <div className={classes["content"]}>
                <BsArrowLeftCircle className={classes["left-button"]} />
                <ul className={classes["content-list"]}>
                  {topRatedData.map((data) => (
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
            )}
            {contentTab === 1 && nowPlayingData && (
              <div className={classes["content"]}>
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
            )}
            {contentTab === 2 && popularData && (
              <div className={classes["content"]}>
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
            )}
          </div>
        </div>
        <div className={classes["side-box"]}>
          <div className={classes["side-content"]}>
            <h1>Search for Movie Title</h1>
            <div className={classes["search-input"]}>
              <input type="text" placeholder="Search" onChange={handleSearch} />
              <AiOutlineSearch className={classes["search-icon"]} />
            </div>
            <div className={classes["search-result"]}>
              {query && searchResult && (
                <ul>
                  {searchResult.map((result) => (
                    <li>
                      <Link to={`/movie/${result.id}`} className={classes.link}>
                        {result.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
              {!query && <div>Please enter a search term...</div>}
            </div>
          </div>
          {nomadlandData && (
            <div className={classes["side-content"]}>
              <div className={classes.watching}>
                <h1>Watching Movie</h1>
                <div className={classes["watching-img"]}>
                  <img
                    src={
                      nomadlandData.poster_path
                        ? `https://image.tmdb.org/t/p/w500${nomadlandData.poster_path}`
                        : `https://image.tmdb.org/t/p/w500${nomadlandData.backdrop_path}`
                    }
                    alt={nomadlandData.title}
                  />
                  <span className={classes["watching-title"]}>
                    {nomadlandData.title}
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

export default MoviePage;
