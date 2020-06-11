import React from 'react';
import axios from 'axios';
import { BOOKS_API_URL } from '../../constants/constants';
import classes from '../Book/BookDetail.module.scss';

class BookDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      book: {
        id: '',
        volumeInfo: {
          title: '',
          authors: '',
          description: '',
          categories: '',
          imageLinks: {
            small: '',
            thumbnail: ''
          }
        }
      },
      showErrorMessage: false
    };
    this.handleUserSelect = this.handleUserSelect.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    const url = BOOKS_API_URL.concat(id);
    axios.get(url).then(response => this.setState({ book: response.data }));
  }

  handleUserSelect(event) {
    if (!window.sessionStorage.getItem('user')) {
      this.setState({ showErrorMessage: true });
      return;
    }
    const userName = window.sessionStorage.getItem('user');
    const user = JSON.parse(window.localStorage.getItem(userName));
    var shelf = event.target.value;

    user.shelves.read = user.shelves.read.filter((book) => book !== this.state.book.id);
    user.shelves.reading = user.shelves.reading.filter((book) => book !== this.state.book.id);
    user.shelves.willRead = user.shelves.willRead.filter((book) => book !== this.state.book.id);

    if (shelf !== 'remove' && shelf !== 'placeholder') {
      user.shelves[shelf].push(this.state.book.id);
    }

    window.localStorage.setItem(userName, JSON.stringify(user));
  }

  render() {
    return (
      <React.Fragment>
        <div className={classes.Wrapper}>
          <div className={classes.ImageBox}>
            <div>
              <img
                src={this.state.book.volumeInfo.imageLinks.small}
                alt={this.state.book.volumeInfo.title}
              />
              <select
                className={classes.Button}
                onChange={this.handleUserSelect}
                defaultValue="placeholder"
              >
                <option disabled hidden value="placeholder">Add book to shelf</option>
                <option value="will">Want to read</option>
                <option value="read">Read</option>
                <option value="reading">Reading</option>
                <option value="remove">Remove from shelf</option>
              </select>
              {this.state.showErrorMessage
                ? <p className={classes.ErrorMessage}>You must be logged in to add a book to this shelf.</p>
                : ''
              }
            </div>
            <div className={classes.InfoBox}>
              <h1>{this.state.book.volumeInfo.title}</h1>
              <h3>by {this.state.book.volumeInfo.authors}</h3>
              {this.state.book.volumeInfo.categories}
            </div>
          </div>
          <p className={classes.BookDescription} dangerouslySetInnerHTML={{ __html: this.state.book.volumeInfo.description }} />
        </div>
      </React.Fragment>
    );
  };
}

export default BookDetail;
