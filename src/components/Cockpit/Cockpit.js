import React from 'react';
import classes from './Cockpit.css'

const cockpit = (props) => {
  let assignedClasses = [];
  let btnClass = '';
  if(props.showPersons) {
    btnClass = classes.red;
  }

  if(props.persons.length <= 2) {
    assignedClasses.push(classes.red);
  }
  if(props.persons.length <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    // Scopes the Cockpit CSS classes to the cockpit component
    <div className={classes.Cockpit}> 
      <h1>Hi, I&#39;m a React App</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button 
        className={btnClass}
        onClick={props.clicked}
      >Toggle Persons
      </button>
    </div>
  );
};

export default cockpit;