import React from 'react';
import axios from 'axios';
import { BOOKS_API_URL } from '../../constants/constants';
import classes from './MyBooks.module.scss';
import Loader from '../../components/Loader/Loader';
import List from '../../components/List/List';

class MyBooks extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      showModal: true,
      books: [],
      userBooks: []
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1000);
    const user = JSON.parse(window.localStorage.getItem(window.sessionStorage.getItem('user')));
    const userBooks = user.shelves.read.concat(user.shelves.reading.concat(user.shelves.willRead));

    userBooks.forEach(id => {
      this.getBook(id);
    });
  }

  getBook(id) {
    const url = BOOKS_API_URL + id;
    axios.get(url).then(response => this.state.books.push(response.data));
  }

  render() {
    return (
      this.state.loading
        ? <Loader className={classes.Loader} />
        : (
          <React.Fragment>
            <div className={classes.Wrapper}>
              <div className={classes.List}>
                <h2>My Books</h2>
                <hr />
                {!this.state.books.length
                  ? <h3>Your shelve is empty.</h3>
                  : ''
                }
                <List books={this.state.books} />
              </div>
            </div>
          </React.Fragment>
        )
    );
  }
}

export default MyBooks;
