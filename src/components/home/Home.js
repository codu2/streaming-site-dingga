import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import classes from "./Home.module.css";
import { AiOutlineClose, AiFillCaretRight } from "react-icons/ai";

const API_KEY = process.env.REACT_APP_API_KEY;

const Home = () => {
  const [content, setContent] = useState(null);
  const [details, setDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [trailer, setTrailer] = useState({});
  const [openTrailer, setOpenTrailer] = useState(false);

  const getData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`
    );
    setContent(response.data.results[0]);

    const getDetails = await axios.get(
      `https://api.themoviedb.org/3/${response.data.results[0].media_type}/${response.data.results[0].id}?api_key=${API_KEY}&language=en-US`
    );
    setDetails(getDetails.data);

    const getTrailer = await axios.get(
      `https://api.themoviedb.org/3/${response.data.results[0].media_type}/${response.data.results[0].id}/videos?api_key=${API_KEY}&language=en-US`
    );
    setTrailer(
      getTrailer.data.results.filter((data) => data.type === "Trailer")[0]
    );
  };

  useEffect(() => {
    getData();
  }, []);

  const handleTrailer = () => {
    setLoading(true);

    const trailerFun = () => {
      setOpenTrailer(true);
      setLoading(false);
    };

    setTimeout(trailerFun(), 1000);

    //clearTimeout(trailerFun);
  };

  return (
    <div className={classes.home}>
      {content && (
        <div className={classes.content}>
          <img
            src={
              content.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${content.backdrop_path}`
                : `https://image.tmdb.org/t/p/w1280${content.poster_path}`
            }
            alt={content.title ? content.title : content.name}
            className={classes["content-image"]}
          />
          <div className={classes["content-info"]}>
            <div className={classes["content-title"]}>
              <Link
                to={`/${content.media_type}/${content.id}`}
                className={classes.link}
              >
                {content.title ? content.title : content.name}
              </Link>
            </div>
            <div className={classes["content-details"]}>
              <div>
                {content.media_type === "tv"
                  ? new Date(content.first_air_date).getFullYear()
                  : new Date(content.release_date).getFullYear()}
              </div>
              {content.media_type === "movie" && (
                <div>{`${details.runtime}(min)`}</div>
              )}
              {content.media_type === "tv" && (
                <div>{`${details.number_of_seasons} Seasons`}</div>
              )}
              {content.media_type === "tv" && (
                <div>{`${details.number_of_episodes} Episodes`}</div>
              )}
              {content.media_type === "tv" && <div>{details.type}</div>}
            </div>
            <div className={classes["content-info-align"]}>
              <div className={classes["content-overview"]}>
                {content.overview}
              </div>
              <div
                className={classes["content-trailer"]}
                onClick={handleTrailer}
              >
                <AiFillCaretRight />
                Watch Trailer
              </div>
            </div>
          </div>
        </div>
      )}
      {openTrailer && (
        <div className={classes.trailer}>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            width="800px"
            height="400px"
            title={content.title ? content.title : content.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div
            className={classes["close-button"]}
            onClick={() => setOpenTrailer(false)}
          >
            <AiOutlineClose />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;

/*
 <div className={classes["content-trailer-loading"]}>
  <div className={classes.outer}>
    <div className={classes.inner}></div>
  </div>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
    width="60px"
    height="60px"
  >
    <defs>
      <linearGradient id="GradientColor">
        <stop offset="0%" stopColor="#ccc" />
        <stop offset="100%" stopColor="#f4f4f4" />
      </linearGradient>
    </defs>
    <circle
      cx="30"
      cy="30"
      r="25"
      strokeLinecap="round"
      className={loading ? classes.active : null}
    />
  </svg>
</div>
<div
  className={classes["content-trailer-button"]}
  onClick={handleTrailer}
>
  Watch Trailer
</div>
*/
