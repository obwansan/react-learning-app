// How to use the useState() React hook (function) with functional components rather
// than stateful class-based components.

import React, { useState } from 'react';
import './App.css';
// Components must be capitalized because in JSX lower-case is reserved for HTML elements
import Person from './Person/Person';

const app = props => {
  // useState always returns an array with two elements, the piece of state
  // passed to useState() and a function to change that specific state.
  const [personsState, setPersonsState] = useState({
    persons: [
      {name: 'Max', age: 28},
      {name: 'Manu', age: 30},
      {name: 'Sam', age: 42}
    ]
  });

  const [otherState, setOtherState] = useState('some other value');

  console.log(personsState, otherState);

  const switchNameHandler = () => {
    setPersonsState({
      persons: [
        {name: 'Maximilian', age: 28},
        {name: 'Manu', age: 30},
        {name: 'Sam', age: 40}
      ]
    }) 
  }

  return (
    <div className="App">
      <h1>Hi, I'm a React App</h1>
      <p>This is really working!</p>
      {/* HTML onclick is lower-case, React onClick is capitalised.
      .onclick is the old equivalent of .addEventListener */}
      <button onClick={switchNameHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age} />
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age} >My hobbies: luge</Person>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
    </div>
  );
  // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  
}

export default app;

/*



*/