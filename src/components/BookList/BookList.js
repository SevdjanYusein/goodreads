import React from 'react';

import SearchArea from '../UI/SearchArea/SearchArea';
import List from '../List/List';
import classes from './BookList.module.scss';
import Aside from '../../components/HomeAside/Aside';

class BookList extends React.Component {
  state = {
    searchField: ''
  };

  searchBook = (event) => {
    event.preventDefault();
    this.props.handleSearch(this.state.searchField);
  };

  handleSearch = (event) => {
    this.setState({ searchField: event.target.value });
  };

  render() {
    return (
      <div className={classes.Wrapper}>
        <div className={classes.List}>
          <SearchArea
            searchBook={this.searchBook}
            handleSearch={this.handleSearch}
          />
          {this.props.books.length === 0
            ? <h1>Sorry, search came back empty</h1>
            : <List books={this.props.books} />
          }
        </div>
        <div className={classes.Aside}><Aside /></div>
      </div>
    );
  }
}

export default BookList;
