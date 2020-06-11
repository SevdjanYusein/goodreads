import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import profileLogo from '../../assets/images/user.png';
import logout from '../../assets/images/logout.png';
import Button from '../UI/Button/Button';
import classes from '../Header/Header.module.scss';

const Header = (props) => {
  return (
    <header className={classes.Header}>
      <div className={classes.Wrapper}>
        <NavLink to='/'>
          <img className={classes.Logo} src={logo} alt="Goodreads" />
        </NavLink>
        <div className={classes.NavButtons}>
          <NavLink to='/'>
            <Button title="Home" className={classes.NavButtons} />
          </NavLink>
          <NavLink to='/myBooks'>
            <Button title="My Books" className={classes.NavButtons} />
          </NavLink>
          <NavLink to='/search'>
            <Button title="Search" className={classes.NavButtons} />
          </NavLink>
        </div>
        <div className={classes.ProfileButtons}>
          <NavLink to='/profile'>
            <div className={classes.Profile}>
              <img className={classes.User} src={profileLogo} alt="Profile button" />
            </div>
          </NavLink>
          <div className={classes.LogoutButton} onClick={props.onLogout}>
            <img className={classes.Logout} src={logout} alt="Logout button" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
