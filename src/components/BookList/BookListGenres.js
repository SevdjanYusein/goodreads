import React from 'react';

import ListGenres from './ListGenres';
import classes from './BookList.module.scss';

const BookListGenres = (props) => {
  return (
    <div>
      <h2 className={classes.Recommendations}>Recommended for you</h2>
      {props.collectionByGenres && props.collectionByGenres.length > 0
        ? props.collectionByGenres.map((collection) =>
          <ListGenres
            key={collection.genre}
            genre={collection.genre}
            books={collection.books}
          />
        ) : (
          <div>
            <h3>
              We're sorry, but we don't have any book recommendations for you yet.
            </h3>
            <p>
              Goodreads learns about your personal tastes from your favorite genres,
              then generates recommendations unique to you. You need to fill favorite
              genres to get Goodreads Recommendations.
            </p>
          </div>
        )
      }
    </div>
  );
};

export default BookListGenres;
