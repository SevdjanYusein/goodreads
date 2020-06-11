import React from 'react';
import classes from './Button.module.scss';

const button = props => {
  const buttonClasses = [classes.Button];
  if (props.className) {
    buttonClasses.push(props.className);
  }

  return (
    <button
      onClick={props.onClick}
      className={buttonClasses.join(' ')}
      style={props.style}
    >
      {props.title}
    </button>
  );
};

export default button; 
