import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, withRouter } from 'react-router-dom';

import HeaderComponent from '../components/Header/Header';
import LoginComponent from '../components/Login-Register/Login';
import HomeContainer from '../containers/Home/Home';
import BookDetailsComponent from '../containers/Book/BookDetail';
import ProfileComponent from '../containers/Profile/Profile';
import MyBooksComponent from '../containers/MyBooks/MyBooks';
import SearchComponent from '../containers/Search/Search';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import classes from './App.module.scss';

import * as authActions from '../actions/authActions';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  handleOnLogout = (event) => {
    event.preventDefault();
    this.props.onLogout();
    window.location.href = '/';
  }

  render() {
    let routes = (
      <LoginComponent
        onLogin={this.props.onLogin}
        error={this.props.error}
      />
    );

    if (this.props.isLogged) {
      routes = (
        <>
          <HeaderComponent onLogout={this.handleOnLogout} />
          <Route path='/profile' component={withRouter(ProfileComponent)} />
          <Route exact path={`/myBooks`} component={withRouter(MyBooksComponent)} />
        </>
      );
    }

    return (
      <BrowserRouter>
        <div className={classes.App}>
          {this.props.isLoading && <Loader />}
          {routes}
          <Route exact path={`/`} component={withRouter(HomeContainer)} />
          <Route exact path={`/search`} component={withRouter(SearchComponent)} />
          <Route exact path={`/book/:id`} component={withRouter(BookDetailsComponent)} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLogged: !!state.auth.username,
    redirectLink: state.auth.authRedirectPath,
    isLoading: state.auth.isLoading,
    error: state.auth.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(authActions.authCheckState()),
    onLogin: (username, password) => dispatch(authActions.login(username, password)),
    onLogout: () => dispatch(authActions.logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
