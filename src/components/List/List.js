import React from 'react';
import DefaultBookImg from '../../assets/images/book.jpg';
import BookCard from './BookCard';
import classes from './BookCard.module.scss';

const List = (props) => {
  return (
    <div className={classes.Container}>
      {props.books.map((book) => {
        return !book.error ? (
          <BookCard
            key={book.id}
            id={book.id}
            image={
              book.volumeInfo.imageLinks
                ? book.volumeInfo.imageLinks.thumbnail
                : DefaultBookImg
            }
            title={book.volumeInfo.title}
            author={book.volumeInfo.authors}
            published={book.volumeInfo.publishedDate}
          />
        ) : null;
      })}
    </div>
  );
};

export default List;
