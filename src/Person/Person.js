import React from 'react';
import Radium from 'radium';

import './Person.css';

const person = (props) => {
  const style = {
    '@media (min-width: 500px)': {
      width: '450px'
    }
  }

  return (
    <div className="Person" style={style}>
      <p onClick={props.click}>I'm {props.name} and I am {props.age} years old</p>
      {/* props.children accesses whatever text or HTML is between the React
      component opening and closing tags */}
      <p>{props.children}</p>
      <input type="text" onChange={props.changed} value={props.name} />
    </div>
  )
};

// We wrap person in a higer-order component that provides person with extra 
// functionality e.g. can use css pseudo-classes in inline JS styling.
export default Radium(person);