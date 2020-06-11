import React from 'react';
import { connect } from 'react-redux';

import BookListGenres from '../../components/BookList/BookListGenres';
import BookList from '../../components/BookList/BookList';
import Register from '../../components/Login-Register/Register';
import Loader from '../../components/Loader/Loader';
import classes from './Home.module.scss';
import * as authActions from '../../actions/authActions';
import * as booksActions from '../../actions/booksActions';
import * as profileActions from '../../actions/profileActions';

class Home extends React.Component {
  componentDidMount() {
    if (this.props.username) {
      this.props.onFetchUserData(this.props.username);
      this.props.onFetchBooksByGenre(this.props.genres, this.props.username);
    } else {
      this.props.onFetchBooks();
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.props.isLoading && <Loader />}
        {this.props.isLogged
          ? (
            <div className={classes.Wrapper}>
              <div className={classes.List}>
                <BookListGenres
                  collectionByGenres={this.props.collectionByGenres}
                />
              </div>
            </div>
          ) : (
            <>
              <Register
                onRegister={this.props.onRegister}
                error={this.props.error}
              />
              <BookList
                books={this.props.books}
                handleSearch={this.props.onFetchBooks}
              />
            </>
          )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    genres: state.profile.genres,
    collectionByGenres: state.books.collectionByGenres,
    isLogged: !!state.auth.username,
    books: state.books.books,
    isLoading: state.books.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onRegister: (username, password, email) => dispatch(authActions.register(username, password, email)),
    onFetchUserData: (username) => dispatch(profileActions.getUserInfo(username)),
    onFetchBooks: (searchTerm) => dispatch(booksActions.fetchBooks(searchTerm)),
    onFetchBooksByGenre: (genres) => dispatch(booksActions.getBooksListByGenre(genres))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
