import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";
import Context from "../../store/Context";

import classes from "./Account.module.css";
import { TiThList } from "react-icons/ti";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineHeart, AiOutlineClose } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";
import { RiDeleteBackLine } from "react-icons/ri";

const API_KEY = process.env.REACT_APP_API_KEY;
const SESSION_ID = process.env.REACT_APP_SESSION_ID;

const WatchList = () => {
  const ctx = useContext(Context);
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [actions, setActions] = useState(null);

  useEffect(() => {
    if (!ctx.user) {
      window.location.replace("/login");
    }
  }, [path]);

  const getWatchListMovie = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist/movies?api_key=${API_KEY}&session_id=${SESSION_ID}`
    );
    return response.data.results;
  };

  const getWatchListTv = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist/tv?api_key=${API_KEY}&session_id=${SESSION_ID}`
    );
    return response.data.results;
  };

  const [watchlistMovie] = useAsync(getWatchListMovie, []);
  const [watchlistTv] = useAsync(getWatchListTv, []);

  const { data: watchlistMovies } = watchlistMovie;
  const { data: watchlistTvShows } = watchlistTv;

  return (
    <div className={classes.container}>
      <h1>
        <TiThList />
        My Watchlist
      </h1>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <h1>Movies</h1>
          <ul className={classes["section-list"]}>
            {watchlistMovies &&
              watchlistMovies.map((item) => (
                <li key={item.id}>
                  <div className={classes["section-item"]}>
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                      }
                      alt={item.title}
                      className={item.img}
                    />
                    <div className={classes["section-item-info"]}>
                      <Link to={`/movie/${item.id}`} className={classes.link}>
                        <div className={classes.title}>{item.title}</div>
                      </Link>
                      <div className={classes.info}>
                        {`${item.release_date}(${
                          item.original_language && item.original_language
                        })`}
                      </div>
                      <div className={classes.overview}>{item.overview}</div>
                    </div>
                    <div className={classes["actions-button"]}>
                      {actions !== item.id ? (
                        <HiOutlineDotsVertical
                          onClick={() => {
                            setActions(item.id);
                          }}
                        />
                      ) : (
                        <AiOutlineClose
                          onClick={() => {
                            if (actions === item.id) {
                              setActions(null);
                            }
                          }}
                        />
                      )}
                      {actions === item.id && (
                        <div className={classes.actions}>
                          <span>
                            <AiOutlineHeart /> Favorite
                          </span>
                          <span>
                            <BsBookmark /> Bookmark
                          </span>
                          <span>
                            <RiDeleteBackLine /> Remove
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
        <div className={classes.section}>
          <h1>TV Shows</h1>
          <ul className={classes["section-list"]}>
            {watchlistTvShows &&
              watchlistTvShows.map((item) => (
                <li key={item.id}>
                  <div className={classes["section-item"]}>
                    <img
                      src={
                        item.poster_path
                          ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
                          : `https://image.tmdb.org/t/p/w500${item.backdrop_path}`
                      }
                      alt={item.name}
                      className={item.img}
                    />
                    <div className={classes["section-item-info"]}>
                      <Link to={`/tv/${item.id}`} className={classes.link}>
                        <div className={classes.title}>{item.name}</div>
                      </Link>
                      <div className={classes.info}>
                        {`${item.first_air_date}(${
                          item.origin_country && item.origin_country[0]
                        })`}
                      </div>
                      <div className={classes.overview}>{item.overview}</div>
                    </div>
                    <div className={classes["actions-button"]}>
                      {actions !== item.id ? (
                        <HiOutlineDotsVertical
                          onClick={() => {
                            setActions(item.id);
                          }}
                        />
                      ) : (
                        <AiOutlineClose
                          onClick={() => {
                            if (actions === item.id) {
                              setActions(null);
                            }
                          }}
                        />
                      )}
                      {actions === item.id && (
                        <div className={classes.actions}>
                          <span>
                            <AiOutlineHeart /> Favorite
                          </span>
                          <span>
                            <BsBookmark /> Bookmark
                          </span>
                          <span>
                            <RiDeleteBackLine /> Remove
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default WatchList;