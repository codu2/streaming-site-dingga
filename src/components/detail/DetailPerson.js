import React from "react";
import { useLocation, Link } from "react-router-dom";

import axios from "axios";
import useAsync from "../../hooks/use-data";

import classes from "./DetailPerson.module.css";

const API_KEY = process.env.REACT_APP_API_KEY;

const DetailPerson = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[2];

  //Andrew Garfield
  const getPerson = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${path}?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  };

  const getPersonCast = async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/person/${path}/movie_credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data.cast;
  };

  const [person] = useAsync(getPerson, []);
  const [cast] = useAsync(getPersonCast, []);

  const { loading, data, error } = person;
  const { data: castData } = cast;

  if (loading) return <div>Loading..</div>;
  if (error) return <div>An error has occurred!</div>;
  if (!data) return null;

  console.log(data, castData);

  return (
    <div className={classes.container}>
      <div className={classes.wrapper}>
        <img
          src={`https://image.tmdb.org/t/p/w500${data.profile_path}`}
          alt={data.name}
          className={classes["content-img"]}
        />
        <div className={classes.content}>
          <div className={classes.name}>{data.name}</div>
          <div className={classes.birth}>
            <div className={classes.birthday}>{data.birthday}</div>
            <div className={classes["place-birth"]}>{data.place_of_birth}</div>
          </div>
          <div className={classes.biography}>{data.biography}</div>
        </div>
      </div>
      <ul className={classes.cast}>
        {castData &&
          castData.map((data) => (
            <li className={classes["cast-item"]} key={data.id}>
              <img
                src={
                  data.poster_path
                    ? `https://image.tmdb.org/t/p/w500${data.poster_path}`
                    : `https://image.tmdb.org/t/p/w500${data.backdrop_path}`
                }
                alt={data.title ? data.title : data.name}
                className={classes["cast-img"]}
              />
              <div className={classes["cast-title"]}>
                <Link
                  to={`/${data.title ? "movie" : "tv"}/${data.id}`}
                  className={classes.link}
                >{`${data.title ? data.title : data.name} (${
                  data.first_air_date
                    ? `${new Date(data.first_air_date).getFullYear()}~`
                    : new Date(data.release_date).getFullYear()
                })`}</Link>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default DetailPerson;
