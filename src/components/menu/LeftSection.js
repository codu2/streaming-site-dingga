import React from 'react';

import classes from './LeftSection.module.css';
import Menu from './Menu';
import { AiFillPlayCircle } from 'react-icons/ai';

const LeftSection = () => {
    return (
        <div className={classes['left-section']}>
            <div className={classes.logo}>
                <AiFillPlayCircle />
                <span>Dingga</span>
            </div>
            <Menu />
        </div>
    )
};

export default LeftSection;