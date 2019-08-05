import React from 'react';
// The CSS rules from App.css are converted into a JS object that is scoped to the Person component.
import classes from './Person.css';

const person = (props) => {
  return (
    <div className={classes.person}>
      <p onClick={props.click}>I&#39;m {props.name} and I am {props.age} years old</p>
      {/* props.children accesses whatever text or HTML is between the React
      component opening and closing tags */}
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  )
};

// We wrap person in a higer-order component that provides person with extra 
// functionality e.g. can use css pseudo-classes in inline JS styling.
export default person;