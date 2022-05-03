import React, { useState, useContext, useEffect } from "react";
import { Chart, registerables } from "chart.js";
import { Doughnut } from "react-chartjs-2";

import Context from "../../store/Context";

Chart.register(...registerables);

const genre = {
  28: "action",
  12: "adventure",
  16: "animation",
  35: "comedy",
  80: "crime",
  99: "documentary",
  18: "drama",
  10751: "family",
  14: "fantasy",
  36: "history",
  27: "horror",
  10402: "music",
  9648: "mystery",
  10749: "romance",
  878: "science fiction",
  10770: "tv movie",
  53: "thriller",
  10752: "war",
  37: "western",
  10759: "action & adventure",
  10762: "kids",
  10763: "news",
  10764: "reality",
  10765: "sci-fi & fantasy",
  10766: "soap",
  10767: "talk",
  10768: "war & politics",
};

const ChartDoughnut = () => {
  const ctx = useContext(Context);
  const [mostWatched, setMostWatched] = useState({});
  const [mostWatchedGenres, setMostWatchedGenres] = useState({});

  useEffect(() => {
    let genre_id = [];
    for (const key in ctx.watchlist_movie) {
      genre_id.push(...ctx.watchlist_movie[key].genre_ids);
    }
    for (const key in ctx.watchlist_tv) {
      genre_id.push(...ctx.watchlist_tv[key].genre_ids);
    }

    const result = {};
    genre_id.forEach((x) => {
      result[x] = (result[x] || 0) + 1;
    });

    let genre_value = [];
    genre_value.push(Object.values(result));

    let genre_name = [];
    for (const key in result) {
      genre_name.push(genre[key]);
    }

    setMostWatched(genre_value);
    setMostWatchedGenres(genre_name);
  }, [ctx]);

  const data = {
    datasets: [
      {
        data: mostWatched[0],
        backgroundColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 0, //경계선 굵기
        fill: true,
      },
    ],
    labels: mostWatchedGenres,
  };

  const options = {
    responsive: false,
    plugins: {
      legend: {
        position: "right",
      },
    },
  };

  return (
    <div>
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ChartDoughnut;
