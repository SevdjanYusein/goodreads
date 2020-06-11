import React from 'react';
import { NavLink } from 'react-router-dom';
import { truncateText } from '../../services/helpers';
import classes from './BookCard.module.scss';

const BookCard = (props) => {
  const linkToSingleBookPage = 'book/' + props.id;

  return (
    <div className={classes.Book} key={props.id}>
      <div className={classes.ImgBox}>
        <NavLink to={linkToSingleBookPage} className={classes.LinkToBookDetails}>
          <img className={classes.BookCover} src={props.image} alt={props.title} />
        </NavLink>
      </div>
      <div>
        <NavLink to={linkToSingleBookPage} className={classes.LinkToBookDetails}>
          <h2 className={classes.Title}>{truncateText(props.title)}</h2>
        </NavLink>
        <p className={classes.BookInfo}>{truncateText(props.author)}</p>
        <p className={classes.BookInfo}>{props.published}</p>
      </div>
    </div>
  );
};

export default BookCard;
