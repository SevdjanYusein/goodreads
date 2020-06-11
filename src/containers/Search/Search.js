import React from 'react';
import { connect } from 'react-redux';

import BookList from '../../components/BookList/BookList';
import Loader from '../../components/Loader/Loader';
import * as booksActions from '../../actions/booksActions';

class Search extends React.Component {
  componentDidMount() {
    this.props.onFetchBooks();
  }

  render() {
    return (
      <>
        {this.props.isLoading && <Loader />}
        <BookList
          books={this.props.books}
          handleSearch={this.props.onFetchBooks}
        />
      </>
    );
  }
};

const mapStateToProps = state => {
  return {
    books: state.books.books,
    isLoading: state.books.isLoading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchBooks: (searchTerm) => dispatch(booksActions.fetchBooks(searchTerm))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
