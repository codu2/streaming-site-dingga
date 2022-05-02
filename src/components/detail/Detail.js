import React, { useState, useContext, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";
import Context from "../../store/Context";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./Detail.module.css";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { BsListUl, BsBookmark, BsBookmarkFill } from "react-icons/bs";
import { TiThList } from "react-icons/ti";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

function PrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowBack
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        color: "#f4f4f4",
        border: "1px solid #f4f4f4",
        borderRadius: "50%",
        padding: "5px",
        width: "35px",
        height: "35px",
      }}
      onClick={onClick}
    />
  );
}

function NextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <IoIosArrowForward
      className={className}
      style={{
        ...style,
        display: "block",
        background: "none",
        color: "#f4f4f4",
        border: "1px solid #f4f4f4",
        borderRadius: "50%",
        padding: "5px",
        width: "35px",
        height: "35px",
      }}
      onClick={onClick}
    />
  );
}

const Detail = () => {
  const ctx = useContext(Context);
  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[2];
  const [trailer, setTrailer] = useState({});
  const [openTrailer, setOpenTrailer] = useState(false);
  const [season, setSeason] = useState([]);
  const [seasonNumber, setSeasonNumber] = useState(1);

  const getData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${path}?api_key=${API_KEY}&language=en-US`
    );

    if (media === "movie") {
      const getTrailer = await axios.get(
        `https://api.themoviedb.org/3/movie/${response.data.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      setTrailer(
        getTrailer.data.results.filter((data) => data.type === "Trailer")[0]
      );
    }

    if (media === "tv") {
      const getTrailer = await axios.get(
        `https://api.themoviedb.org/3/tv/${response.data.id}/videos?api_key=${API_KEY}&language=en-US`
      );
      setTrailer(
        getTrailer.data.results.filter((data) => data.type === "Trailer")[0]
      );

      const getSeason = await axios.get(
        `https://api.themoviedb.org/3/tv/${response.data.id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
      );
      setSeason(getSeason.data);
    }

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

  useEffect(() => {
    const getSeason = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/tv/${data.id}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`
      );
      setSeason(response.data);
    };
    if (media === "tv" && data) {
      getSeason();
    }
  }, [seasonNumber]);

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
            //window.alert("Added to watchlist");
            window.location.reload();
            //window.location.replace(`/account/${ctx.user.id}/watchlist`);
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
        ctx.favorite_tv.find((item) => item.id === data.id)
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
            //window.alert("Added to favorite");
            window.location.reload();
            //window.location.replace(`/account/${ctx.user.id}/favorite`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      window.alert(`Please login to add this ${media} to your favorite`);
    }
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    arrows: false,
  };

  const settingsList = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
    draggable: false,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img
          src={
            data.backdrop_path
              ? `https://image.tmdb.org/t/p/original${data.backdrop_path}`
              : data.poster_path &&
                `https://image.tmdb.org/t/p/original${data.poster_path}`
          }
          alt={data.name}
          className={classes["content-img"]}
        />
        <div className={classes.content}>
          <div className={classes["content-top"]}>
            <div className={classes.title}>
              {`${media === "tv" ? data.name : data.title} (${
                media === "tv"
                  ? `${new Date(data.first_air_date).getFullYear()}~`
                  : new Date(data.release_date).getFullYear()
              })`}
            </div>
            <div className={classes.actions}>
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
          <div className={classes.info}>
            <div className={classes.details}>
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
              {media === "movie" && <div>{`${data.runtime}(min)`}</div>}
              {media === "tv" && (
                <div>{`${data.number_of_seasons} Seasons`}</div>
              )}
              {media === "tv" && (
                <div>{`${data.number_of_episodes} Episodes`}</div>
              )}
              {media === "tv" && <div>{data.type}</div>}
            </div>
            <div className={classes["sub-details"]}>
              <span>
                {media === "tv"
                  ? `Episode Run Time : ${data.episode_run_time}(min)`
                  : `RunTime : ${data.runtime}(min)`}
              </span>
              {data.original_language && (
                <span>{`Languages : ${data.original_language}`}</span>
              )}
            </div>
          </div>
          <div className={classes.cast}>
            {castData
              .filter((data, index) => index < 5)
              .map((data) => (
                <div className={classes["cast-info"]} key={data.id}>
                  <span>{data.character}</span>
                  <span>{data.name}</span>
                </div>
              ))}
          </div>
          {data.tagline !== "" && (
            <div className={classes.tagline}>{`"${data.tagline}"`}</div>
          )}
          <div className={classes.overview}>{data.overview}</div>
          <button
            className={classes.watch}
            onClick={() => setOpenTrailer(true)}
            disabled={trailer ? false : true}
          >
            Watch Trailer
          </button>
        </div>
        <div className={classes["content-wrapper"]}>
          {media === "tv" && data.next_episode_to_air && (
            <div className={classes["next-episode"]}>
              <div className={classes["next-episode-content"]}>
                <h1>Next Episode</h1>
                <div className={classes["next-episode-info"]}>
                  <div>{`Episode ${data.next_episode_to_air.episode_number}`}</div>
                  <div>{`Airing Date : ${data.next_episode_to_air.air_date}`}</div>
                </div>
              </div>
              <div className={classes["next-episode-name"]}>
                {data.next_episode_to_air.name}
              </div>
            </div>
          )}
          {media === "tv" && (
            <div className={classes["last-episode"]}>
              <h1>Last Episode</h1>
              <div className={classes["last-episode-content"]}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${data.last_episode_to_air.still_path}`}
                  alt={data.last_episode_to_air.name}
                />
                <div className={classes["last-episode-info"]}>
                  <div className={classes["last-episode-season"]}>
                    {`Season ${data.last_episode_to_air.season_number}`}
                  </div>
                  <div className={classes["last-episode-name"]}>
                    {`Episode ${data.last_episode_to_air.episode_number}. ${data.last_episode_to_air.name}`}
                  </div>
                  <div className={classes["last-episode-overview"]}>
                    {data.last_episode_to_air.overview}
                  </div>
                </div>
              </div>
            </div>
          )}
          {media === "tv" && (
            <div className={classes.season}>
              <div className={classes["season-actions"]}>
                <h1>{`Season ${seasonNumber} (${
                  season.air_date && new Date(season.air_date).getFullYear()
                })`}</h1>
                <div>
                  {data.number_of_seasons > 1 &&
                    data.seasons
                      .filter((season) => season.season_number > 0)
                      .map((season) => (
                        <button
                          key={season.id}
                          onClick={() => setSeasonNumber(season.season_number)}
                          className={
                            season.season_number === seasonNumber
                              ? classes.active
                              : null
                          }
                        >
                          {season.season_number}
                        </button>
                      ))}
                </div>
              </div>
              <Slider {...settings} className={classes["season-episode"]}>
                {season.episodes &&
                  season.episodes
                    .filter(
                      (episode) =>
                        new Date(episode.air_date).getTime() <=
                        new Date().getTime()
                    )
                    .map((episode) => (
                      <div key={episode.id}>
                        <img
                          src={`https://image.tmdb.org/t/p/w500${episode.still_path}`}
                          alt={episode.name}
                        />
                        <div className={classes["season-episode-info"]}>
                          <span>{episode.name}</span>
                          <span>{episode.overview}</span>
                        </div>
                      </div>
                    ))}
              </Slider>
            </div>
          )}
          <div className={classes.review}>
            <h1>Reviews</h1>
            <ul className={classes["review-list"]}>
              {reviewsData.map((review) => (
                <li key={review.id} className={classes["review-list-item"]}>
                  <div>{review.author}</div>
                  <div>{review.content}</div>
                  <div>{new Date(review.created_at).toDateString()}</div>
                </li>
              ))}
            </ul>
          </div>
          <div className={classes.similar}>
            <h1>More Like This</h1>
            <Slider {...settingsList} className={classes["similar-list"]}>
              {similarData
                .filter((data, index) => data.poster_path && index < 14)
                .map((data) => (
                  <li className={classes["similar-list-item"]} key={data.id}>
                    <Link to={`/${media}/${data.id}`}>
                      <img
                        src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                        alt={media === "tv" ? data.name : data.title}
                      />
                    </Link>
                  </li>
                ))}
            </Slider>
          </div>
        </div>
        {data.networks && (
          <div className={classes["content-networks"]}>
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
          </div>
        )}
      </div>
      {openTrailer && trailer && (
        <div className={classes.trailer}>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            width="800px"
            height="400px"
            title={trailer.name}
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

export default Detail;
