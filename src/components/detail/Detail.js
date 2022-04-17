import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./Detail.module.css";
import { FaPlus } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_API_KEY;

const Detail = () => {
  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[2];
  const [reviewsTab, setReviewsTab] = useState(true);

  const getData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${path}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

  const getSimilar = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${path}/similar?api_key=${API_KEY}&include_adult=false&language=en-US&page=1`
    );
    return response.data.results;
  };

  const getReviews = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${path}/reviews?api_key=${API_KEY}&language=en-US&page=1`
    );
    return response.data.results;
  };

  const [state] = useAsync(getData, []);
  const [similar] = useAsync(getSimilar, []);
  const [reviews] = useAsync(getReviews, []);

  const { loading, data, error } = state;
  const { data: similarData } = similar;
  const { data: reviewsData } = reviews;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  const reviewsTabCss = `${classes["detail-tab"]} ${
    reviewsTab && classes.active
  }`;
  const similarTabCss = `${classes["detail-tab"]} ${
    !reviewsTab && classes.active
  }`;

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
              : `https://image.tmdb.org/t/p/w500${data.poster_path}`
          }
          alt={data.name}
          className={classes["content-img"]}
        />
        <div className={classes.content}>
          <div className={classes["content-map"]}>
            {data.networks &&
              data.networks.map((network, i) => (
                <div key={i}>
                  {network.logo_path && (
                    <img
                      key={i}
                      src={`https://image.tmdb.org/t/p/w500${network.logo_path}`}
                      alt={network.name}
                      className={classes["logo-img"]}
                    />
                  )}
                </div>
              ))}
            {data.production_companies &&
              data.production_companies.map((production, i) => (
                <div key={i}>
                  {production.logo_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${production.logo_path}`}
                      alt={production.name}
                      className={classes["logo-img"]}
                    />
                  )}
                </div>
              ))}
          </div>
          <div className={classes.title}>
            <span>{`${media === "tv" ? data.name : data.title} (${new Date(
              data.release_date
            ).getFullYear()})`}</span>
            <span>{`${data.vote_average} (${data.vote_count})`}</span>
          </div>
          {data.tagline !== "" && (
            <div className={classes.tagline}>{`"${data.tagline}"`}</div>
          )}
          {data.genres && (
            <ul className={classes.genres}>
              {data.genres.map((genre) => (
                <li key={genre.id} className={classes.genre}>
                  <Link to={`/genre/${genre.id}`} className={classes.link}>
                    {genre.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <div className={classes.info}>
            <span>
              {media === "tv"
                ? `Episode Run Time : ${data.episode_run_time}(min)`
                : `RunTime : ${data.runtime}(min)`}
            </span>
            {data.languages && (
              <span>
                {media === "tv"
                  ? `Languages : ${data.languages.map((language) => language)}`
                  : `Languages : ${data.original_language}`}
              </span>
            )}
          </div>
          <div className={classes.actions}>
            <button className={classes.watch}>Watch Now</button>
            <button className={classes.add}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.overview}>{data.overview}</div>
        <div className={classes.detail}>
          <div className={classes["detail-tabs"]}>
            <span className={reviewsTabCss} onClick={() => setReviewsTab(true)}>
              Reviews
            </span>
            <span
              className={similarTabCss}
              onClick={() => setReviewsTab(false)}
            >{`Similar ${media}`}</span>
          </div>
          {reviewsTab && reviewsData && (
            <div className={classes.reviews}>
              <ul className={classes["review-list"]}>
                {reviewsData.map((review) => (
                  <li className={classes["review-list-item"]} key={review.id}>
                    <span>{review.author}</span>
                    <span>{review.content}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
          {!reviewsTab && similarData && (
            <div className={classes.similar}>
              <ul className={classes["similar-list"]}>
                <li className={classes["similar-list-item"]}>
                  <Link to={`/${media}/${similarData[0].id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${similarData[0].poster_path}`}
                      alt={
                        media === "tv"
                          ? similarData[0].name
                          : similarData[0].title
                      }
                    />
                  </Link>
                </li>
                <li className={classes["similar-list-item"]}>
                  <Link to={`/${media}/${similarData[1].id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${similarData[1].poster_path}`}
                      alt={
                        media === "tv"
                          ? similarData[1].name
                          : similarData[1].title
                      }
                    />
                  </Link>
                </li>
                <li className={classes["similar-list-item"]}>
                  <Link to={`/${media}/${similarData[2].id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${similarData[2].poster_path}`}
                      alt={
                        media === "tv"
                          ? similarData[2].name
                          : similarData[2].title
                      }
                    />
                  </Link>
                </li>
                <li className={classes["similar-list-item"]}>
                  <Link to={`/${media}/${similarData[3].id}`}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${similarData[3].poster_path}`}
                      alt={
                        media === "tv"
                          ? similarData[3].name
                          : similarData[3].title
                      }
                    />
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detail;
