import React from "react";
import { useLocation } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./Detail.module.css";
import { FaPlus } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_API_KEY;

const Detail = () => {
  const location = useLocation();
  const media = location.pathname.split("/")[1];
  const path = location.pathname.split("/")[2];

  const getData = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/${media}/${path}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

  const [state] = useAsync(getData, []);

  const { loading, data, error } = state;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  console.log(data);

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
                  {network.logo_path ? (
                    <img
                      key={i}
                      src={`https://image.tmdb.org/t/p/w500${network.logo_path}`}
                      alt={network.name}
                      className={classes["logo-img"]}
                    />
                  ) : (
                    <span className={classes["logo-name"]}>{network.name}</span>
                  )}
                </div>
              ))}
            {data.production_companies &&
              data.production_companies.map((production, i) => (
                <div key={i}>
                  {production.logo_path ? (
                    <img
                      src={`https://image.tmdb.org/t/p/w500${production.logo_path}`}
                      alt={production.name}
                      className={classes["logo-img"]}
                    />
                  ) : (
                    <span className={classes["logo-name"]}>
                      {production.name}
                    </span>
                  )}
                </div>
              ))}
          </div>
          <div className={classes.title}>
            <span>{media === "tv" ? data.name : data.original_title}</span>
            <span>{`${data.vote_average} (${data.vote_count})`}</span>
          </div>
          {data.tagline !== "" && (
            <div className={classes.tagline}>{`"${data.tagline}"`}</div>
          )}
          <ul className={classes.genres}>
            {data.genres.map((genre) => (
              <li key={genre.id} className={classes.genre}>
                {genre.name}
              </li>
            ))}
          </ul>
          <div className={classes.info}>
            <span>
              {media === "tv"
                ? `Episode Run Time : ${data.episode_run_time}(min)`
                : `RunTime : ${data.runtime}(min)`}
            </span>
            <span>
              {media === "tv"
                ? `Languages : ${data.languages.map((language) => language)}`
                : `Languages : ${data.original_language}`}
            </span>
          </div>
          <div className={classes.actions}>
            <button className={classes.watch}>Watch Now</button>
            <button className={classes.add}>
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
      <div className={classes.desc}>
        <div className={classes.overview}>{data.overview}</div>
      </div>
    </div>
  );
};

export default Detail;
