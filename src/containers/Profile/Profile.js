import React from 'react';
import { connect } from 'react-redux';

import GenresModal from '../../components/GenresModal/GenresModal';
import classes from './Profile.module.scss';
import userAvatar from '../../assets/images/user.png';
import Button from '../../components/UI/Button/Button';
import BookList from '../../components/BookList/BookList';

import * as profileActions from '../../actions/profileActions';
import * as booksActions from '../../actions/booksActions';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false
    };
    this.handleModalClose = this.handleModalClose.bind(this);
    this.showModal = this.showModal.bind(this);
  }

  componentDidMount() {
    if (this.props.username) {
      this.props.onFetchUserData(this.props.username);
    }
    this.props.onFetchBooks();
  }

  handleModalClose(newSelectedGenres) {
    this.setState({ showModal: false });
    this.props.onGenresUpdate(newSelectedGenres, this.props.username);
  }

  showModal() {
    this.setState({ showModal: true });
  }

  render() {
    return (
      <React.Fragment>
        {this.state.showModal
          ? (
            <GenresModal
              handleModalClose={this.handleModalClose}
              favoriteGenres={this.props.genres}
            />
          )
          : ''
        }
        <div className={classes.Wrapper}>
          <div>
            <img className={classes.UserAvatar}
              src={userAvatar}
              alt={this.props.username}
            />
          </div>
          <div className={classes.UserInfo}>
            <h2 className={classes.UserName}>{this.props.username}</h2>
            <hr />
            <p className={classes.UsersShelvesParagraph}>
              {this.props.username}'s bookshelves
            </p>
            <ul>
              <li>Read‎: ({this.props.shelves.read.length})</li>
              <li>Currently-reading‎: ({this.props.shelves.reading.length})</li>
              <li>Want to read: ({this.props.shelves.willRead.length})</li>
            </ul>
          </div>
          <div className={classes.UserFavGenres}>
            <span className={classes.FavoriteGenresText}>Favorite genres</span>
            <Button
              className={classes.EditButton}
              title="(edit)"
              onClick={this.showModal}
            />
            <hr />
            <div className={classes.GenresList}>
              {this.props.genres.map((genre) => (
                <p key={genre} className={classes.Genre}>{genre}</p>
              ))}
            </div>
          </div>
        </div>
        <div className={classes.UserBooks}>
          <h3 className={classes.StaticText}>You can find new books here</h3>
          <hr />
          <BookList
            books={this.props.books}
            handleSearch={this.props.onFetchBooks}
          />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    username: state.auth.username,
    shelves: state.profile.shelves,
    genres: state.profile.genres,
    books: state.books.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchUserData: (username) => dispatch(profileActions.getUserInfo(username)),
    onGenresUpdate: (newSelectedGenres, username) => dispatch(profileActions.updateUserInfo(newSelectedGenres, username)),
    onFetchBooks: (searchTerm) => dispatch(booksActions.fetchBooks(searchTerm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
