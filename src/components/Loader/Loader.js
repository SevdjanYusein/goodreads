import React from 'react';
import classes from './Loader.module.scss';
import loader from '../../assets/images/loader.gif';

const Loader = () => {
  return (
    <div className={classes.Wrapper}>
      <img
        className={classes.LoaderImage}
        src={loader}
        alt="Loading page"
      />
    </div>
  );
};

export default Loader;
