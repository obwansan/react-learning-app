import React from 'react';
import Person from './Person/Person';

// Don't need curly braces or return statement in ES6 if the content of the 
// function can work on one line (doesn't have to be on one line, just 
// has to work on one line.)
const Persons = (props) => props.persons.map((person, index) => {
  return <Person 
    click={() => props.clicked(index)}
    name={person.name} 
    age={person.age} 
    key={person.id}
    changed={(event) => props.changed(event, person.id)}
    />
});

export default Persons; 