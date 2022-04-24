import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";
import Context from "../../store/Context";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./Detail.module.css";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BsListUl, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TiThList } from "react-icons/ti";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

const Detail = () => {
  const ctx = useContext(Context);
  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[2];
  const [contentTab, setContentTab] = useState(0);

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

  const getCast = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${path}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast;
  };

  const [state] = useAsync(getData, []);
  const [similar] = useAsync(getSimilar, []);
  const [reviews] = useAsync(getReviews, []);
  const [cast] = useAsync(getCast, []);

  const { loading, data, error } = state;
  const { data: similarData } = similar;
  const { data: reviewsData } = reviews;
  const { data: castData } = cast;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  const handleWatchlist = async () => {
    if (ctx.user) {
      if (
        ctx.watchlist_movie.find((item) => item.id === data.id) ||
        ctx.watchlist_tv.find((item) => item.id === data.id)
      ) {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            {
              media_type: media,
              media_id: data.id,
              watchlist: false,
            }
          );
          if (response.data.success) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            {
              media_type: media,
              media_id: data.id,
              watchlist: true,
            }
          );
          if (response.data.success) {
            window.location.replace(`/account/${ctx.user.id}/watchlist`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      window.alert(`Please login to add this ${media} to your watchlist`);
    }
  };

  const handleFavorite = async () => {
    if (ctx.user) {
      if (
        ctx.favorite_movie.find((item) => item.id === data.id) ||
        ctx.favorite_movie.find((item) => item.id === data.id)
      ) {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            {
              media_type: media,
              media_id: data.id,
              favorite: false,
            }
          );
          if (response.data.success) {
            window.location.reload();
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            {
              media_type: media,
              media_id: data.id,
              favorite: true,
            }
          );
          if (response.data.success) {
            window.location.replace(`/account/${ctx.user.id}/favorite`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      window.alert(`Please login to add this ${media} to your favorite`);
    }
  };

  const castTabCss = `${classes["detail-tab"]} ${
    contentTab === 0 && classes.active
  }`;
  const reviewsTabCss = `${classes["detail-tab"]} ${
    contentTab === 1 && classes.active
  }`;
  const similarTabCss = `${classes["detail-tab"]} ${
    contentTab === 2 && classes.active
  }`;

  const settings = {
    dots: false, // 점은 안 보이게
    infinite: false, // 무한 슬라이더
    speed: 500,
    slidesToShow: 5, //5장씩 보이게 해주세요
    slidesToScroll: 5, //1장씩 넘어가세요
    arrows: false,
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
              : data.poster_path &&
                `https://image.tmdb.org/t/p/w500${data.poster_path}`
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
            <span>{`${media === "tv" ? data.name : data.title} (${
              media === "tv"
                ? `${new Date(data.first_air_date).getFullYear()}~`
                : new Date(data.release_date).getFullYear()
            })`}</span>
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
            <button className={classes.add} onClick={handleWatchlist}>
              {(ctx.watchlist_movie &&
                ctx.watchlist_movie.find((item) => item.id === data.id)) ||
              (ctx.watchlist_tv &&
                ctx.watchlist_tv.find((item) => item.id === data.id)) ? (
                <TiThList />
              ) : (
                <BsListUl />
              )}
            </button>
            <button className={classes.like} onClick={handleFavorite}>
              {(ctx.favorite_movie &&
                ctx.favorite_movie.find((item) => item.id === data.id)) ||
              (ctx.favorite_tv &&
                ctx.favorite_tv.find((item) => item.id === data.id)) ? (
                <AiFillHeart />
              ) : (
                <AiOutlineHeart />
              )}
            </button>
            <button className={classes.bookmark}>
              <BsBookmark />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.details}>
        <div className={classes.overview}>{data.overview}</div>
        <div className={classes.detail}>
          <div className={classes["detail-tabs"]}>
            <span className={castTabCss} onClick={() => setContentTab(0)}>
              Cast
            </span>
            <span className={reviewsTabCss} onClick={() => setContentTab(1)}>
              Reviews
            </span>
            <span
              className={similarTabCss}
              onClick={() => setContentTab(2)}
            >{`Similar ${media}`}</span>
          </div>
          {contentTab === 0 && castData && (
            <div className={classes.cast}>
              <Slider {...settings} className={classes["cast-list"]}>
                {castData.map((data) => (
                  <div key={data.id} className={classes["cast-list-item"]}>
                    <Link to={`/person/${data.id}`} className={classes.link}>
                      <img
                        src={
                          data.profile_path &&
                          `https://image.tmdb.org/t/p/w500${data.profile_path}`
                        }
                        alt={data.profile_path && data.name}
                      />
                    </Link>
                    <div className={classes["cast-info"]}>
                      <div>{data.character}</div>
                      <div>{data.name}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          )}
          {contentTab === 1 && reviewsData && (
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
          {contentTab === 2 && similarData && (
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
