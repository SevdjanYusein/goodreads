import React from 'react';

import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import background from '../../assets/images/background-book.jpg';
import backgroundWords from '../../assets/images/title.png';
import classes from './Register.module.scss';
import { USERNAME_REGEX, PASSWORD_REGEX, EMAIL_REGEX } from '../../constants/constants';
import { checkValidity } from '../../services/helpers';

class Register extends React.Component {
  state = {
    controls: {
      username: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Username',
          name: 'username'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          regexPattern: USERNAME_REGEX
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
          name: 'password'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          regexPattern: PASSWORD_REGEX
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email',
          name: 'email'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          regexPattern: EMAIL_REGEX
        }
      }
    },
    isFormValid: false,
    isFormTouched: false
  };

  handleUserInput = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
        touched: true
      }
    };

    let formIsValid = true;
    for (let inputControl in updatedControls) {
      formIsValid = updatedControls[inputControl].valid && formIsValid;
    }

    this.setState({
      controls: updatedControls,
      isFormValid: formIsValid,
      isFormTouched: true
    });
  };

  onRegister = (event) => {
    event.preventDefault();

    if (!this.state.isFormTouched) {
      this.setState({ isFormTouched: true });
    }

    if (this.state.isFormValid) {
      const email = this.state.controls.email.value;
      const username = this.state.controls.username.value;
      const password = this.state.controls.password.value;

      this.props.onRegister(username, password, email);
    }
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }

    const form = formElementsArray.map(formElement => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        invalid={!formElement.config.valid}
        shouldValidation={formElement.config.validation}
        touched={formElement.config.touched}
        changed={(event) => this.handleUserInput(event, formElement.id)}
      />
    ));

    let errorMessageClasses = [classes.ErrorMessage];
    if (this.state.isFormTouched && !this.state.isFormValid) {
      errorMessageClasses.push(classes.Visible);
    } else {
      errorMessageClasses = [classes.ErrorMessage];
    }

    return (
      <React.Fragment>
        <div className={classes.Background}>
          <img
            className={classes.BackgroundWords}
            src={backgroundWords}
            alt="Meet your next favourite book"
          />
          <div className={classes.Register}>
            <p className={classes.RegisterParagraph}>
              New here? Create a free account!
            </p>
            <form onSubmit={this.onRegister}>
              {form}
              <Button
                className={classes.SignUpButton}
                type="submit"
                title="Sign up"
              />
              <p className={errorMessageClasses.join(' ')}>
                Pleace enter valid information!
              </p>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Register;
