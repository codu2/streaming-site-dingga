import React from 'react';

import classes from './ListItem.module.css';

const ListItem = props => {
    const setListItem = props.listData.map((item) => (
        <li key={item.id}>
            <div className={classes['item-card']}>
                <img src={`https://image.tmdb.org/t/p/w500${item.backdrop_path}`} alt="list-item" />
                <div className={classes['item-title']}>{item.title}</div>
            </div>
        </li>
    ))

    return (
        <ul className={classes.list}>
            {setListItem}
        </ul>
    )
};

export default ListItem;