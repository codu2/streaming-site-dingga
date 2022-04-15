import React, { useState } from 'react';

import classes from './Home.module.css';
import All from '../all/All';
import Movie from '../movie/Movie';
import TvShow from '../tv-show/TvShow';

const Home = () => {
    const [all, setAll] = useState(true);
    const [movie, setMovie] = useState(false);
    const [tv, setTv] = useState(false);

    const onAllTabbed = event => {
        event.preventDefault();

        setAll(true);
        setMovie(false);
        setTv(false);
    }

    const onMovieTabbed = event => {
        event.preventDefault();

        setAll(false);
        setMovie(true);
        setTv(false);
    }

    const onTvTabbed = event => {
        event.preventDefault();
        
        setAll(false);
        setMovie(false);
        setTv(true);
    }

    const allClasses = `${classes.tab} ${all === true ? classes['show-tab'] : ''}`;
    const movieClasses = `${classes.tab} ${movie === true ? classes['show-tab'] : ''}`;
    const tvClasses = `${classes.tab} ${tv === true ? classes['show-tab'] : ''}`;
    
    return (
        <div className={classes.home}>
            <ul className={classes['home-tab']}>
                <li onClick={onAllTabbed} className={allClasses}>All</li>
                <li onClick={onMovieTabbed} className={movieClasses}>Movie</li>
                <li onClick={onTvTabbed} className={tvClasses}>TV-Show</li>
            </ul>
            {all && <All />}
            {movie && <Movie />}
            {tv && <TvShow />}
        </div>
    )
};

export default Home;

