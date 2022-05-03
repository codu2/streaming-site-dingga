import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import axios from "axios";
import Context from "../../store/Context";

import classes from "./Account.module.css";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { AiOutlineHeart, AiFillHeart, AiOutlineClose } from "react-icons/ai";
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

  const handleWatchlist = async (data) => {
    if (ctx.user) {
      if (
        ctx.watchlist_movie.find((item) => item.id === data.id) ||
        ctx.watchlist_tv.find((item) => item.id === data.id)
      ) {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/account/${ctx.user.id}/watchlist?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            {
              media_type: data.title ? "movie" : "tv",
              media_id: data.id,
              watchlist: false,
            }
          );
          console.log(response.data);
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
              media_type: data.title ? "movie" : "tv",
              media_id: data.id,
              watchlist: true,
            }
          );
          if (response.data.success) {
            window.location.reload();
            //window.location.replace(`/account/${ctx.user.id}/watchlist`);
          }
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      window.alert(
        `Please login to add this ${
          data.title ? "movie" : "tv"
        } to your watchlist`
      );
    }
  };

  const handleFavorite = async (data) => {
    if (ctx.user) {
      if (
        ctx.favorite_movie.find((item) => item.id === data.id) ||
        ctx.favorite_tv.find((item) => item.id === data.id)
      ) {
        try {
          const response = await axios.post(
            `https://api.themoviedb.org/3/account/${ctx.user.id}/favorite?api_key=${API_KEY}&session_id=${SESSION_ID}`,
            {
              media_type: data.title ? "movie" : "tv",
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
              media_type: data.title ? "movie" : "tv",
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
      window.alert(
        `Please login to add this ${
          data.title ? "movie" : "tv"
        } to your favorite`
      );
    }
  };

  return (
    <div className={classes.container}>
      <h1>My Watchlist</h1>
      <div className={classes.wrapper}>
        <div className={classes.section}>
          <h1>Movies</h1>
          <ul className={classes["section-list"]}>
            {ctx.watchlist_movie &&
              ctx.watchlist_movie.map((item) => (
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
                          {ctx.favorite_movie.find(
                            (movie) => movie.id === item.id
                          ) ? (
                            <span style={{ cursor: "not-allowed" }}>
                              <AiFillHeart /> In My Favorites
                            </span>
                          ) : (
                            <span onClick={() => handleFavorite(item)}>
                              <AiOutlineHeart />
                              Mark as Favorites
                            </span>
                          )}
                          <span>
                            <BsBookmark /> Bookmark
                          </span>
                          <span onClick={() => handleWatchlist(item)}>
                            <RiDeleteBackLine />
                            Remove
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
            {ctx.watchlist_tv &&
              ctx.watchlist_tv.map((item) => (
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
                          {ctx.favorite_tv.find((tv) => tv.id === item.id) ? (
                            <span style={{ cursor: "not-allowed" }}>
                              <AiFillHeart /> In My Favorites
                            </span>
                          ) : (
                            <span onClick={() => handleFavorite(item)}>
                              <AiOutlineHeart />
                              Mark as Favorites
                            </span>
                          )}
                          <span>
                            <BsBookmark /> Bookmark
                          </span>
                          <span onClick={() => handleWatchlist(item)}>
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
