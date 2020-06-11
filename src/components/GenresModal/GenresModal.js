import React from 'react';
import { connect } from 'react-redux';

import classes from './GenresModal.module.scss';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import { GENRES } from '../../constants/constants';

import { UPDATE_GENRES } from '../../actions/actionTypes';

class GenresModal extends React.Component {
  state = {
    selectedGenres: this.props.favoriteGenres.slice()
  };

  handleCheckboxClicked = (event) => {
    let selectedGenres = [...this.state.selectedGenres];
    if (selectedGenres.indexOf(event.target.value) !== -1) {
      selectedGenres = selectedGenres.filter(
        genre => genre !== event.target.value
      );
    } else {
      selectedGenres.push(event.target.value);
    }
    this.setState({ selectedGenres });
  };

  selectGenres = (event) => {
    event.preventDefault();
    this.props.updateGenres(this.state.selectedGenres);
    this.props.handleModalClose(this.state.selectedGenres);
  };

  render() {
    return (
      <div className={classes.ModalWindow}>
        <div>
          <div
            title="Close"
            className={classes.ModalClose}
            onClick={() => this.props.handleModalClose(this.props.favoriteGenres.slice())}
          >
            Close
          </div>
          <h1>Choose your favorites genres</h1>
          <form onSubmit={this.selectGenres}>
            <div className={classes.CheckList}>
              {GENRES.map((genre) => (
                <label className={classes.ModalCheckBox} key={genre}>
                  <Input
                    elementType='input'
                    elementConfig={{
                      className: '',
                      type: 'checkbox',
                      defaultChecked: this.state.selectedGenres.indexOf(genre) >= 0
                    }}
                    changed={(event) => this.handleCheckboxClicked(event)}
                    value={genre}
                  />
                  {genre}
                </label>
              )
              )}
            </div>
            <div className={classes.SubmitButton} >
              <Button type="submit" title="OK" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    genres: state.genres
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateGenres: (newSelectedGenres) => dispatch({ type: UPDATE_GENRES, newSelectedGenres })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenresModal);
