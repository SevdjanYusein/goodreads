import React from 'react';

import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import classes from '../Login-Register/Login.module.scss';
import { USERNAME_REGEX, PASSWORD_REGEX } from '../../constants/constants';
import { checkValidity } from '../../services/helpers';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

class Login extends React.Component {
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

  onLogin = (event) => {
    event.preventDefault();

    if (!this.state.isFormTouched) {
      this.setState({ isFormTouched: true });
    }

    if (this.state.isFormValid) {
      const username = this.state.controls.username.value;
      const password = this.state.controls.password.value;

      this.props.onLogin(username, password);
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
        className={classes.LoginInput}
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
      <div className={classes.Container}>
        <div className={classes.Header}>
          <NavLink to='/'>
            <img className={classes.Logo} src={logo} alt="GoodReads" />
          </NavLink>
          <form
            className={classes.LoginForm}
            onSubmit={this.onLogin}
          >
            {form}
            <Button
              className={classes.LoginButton}
              title="Sign in"
            />
            <div className={classes.MessageSection}>
              <p className={errorMessageClasses.join(' ')}>
                Wrong username or password!
              </p>
              <NavLink to='/' className={classes.NewAccount}>
                <span className={classes.NewAccountParagraph}>Create a New Account</span>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
