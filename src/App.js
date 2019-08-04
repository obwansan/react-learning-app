import React, { Component } from 'react';
// The CSS rules from App.css are converted into a JS object that is scoped to the App component. This happens because we enabled CSS modules in the webpack config. By importing App.css as 'some name' (e.g. classes), the localIdentName option creates an App component-specific JS object. Each CSS rule is converted into a property on the classes object. The classes object is 'scoped' / 'namespaced' / made unique to the App component by combining the name of each CSS rule (selector) with the name of the file it's imported into (local) and hashed.
import classes from './App.css';
import Person from './Person/Person';
import ErrorBoundary from './ErrorBoundary/ErrorBoundary';

class App extends Component {
  state = {
    persons: [
      { id: 'asd1', name: 'Max', age: 28 },
      { id: 'dfg2', name: 'Manu', age: 29 },
      { id: 'cvb3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  nameChangedHandler = (event, id) => {
    // Find index of person object whose name is being changed
    const personIndex = this.state.persons.findIndex(person => {
      return person.Userid === id;
    });

    // Get a copy of the person state object corresponding to the Person component whose input field is being typed in (name changed).
    const person = {
      ...this.state.persons[personIndex]
    }

    // Update the name property of the person object copy with the value of the input field (on each key press)
    person.name = event.target.value;

    // Get a copy of state's array of person objects
    const persons = [...this.state.persons];

    // Update the copy of state's array of person objects with changed person object
    persons[personIndex] = person;

    // Update state (overwrite current persons array with new update persons array)
    this.setState( {persons: persons} );

  }

  // Don't modify state directly. Make a copy, modify it and then use setState
  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons.slice();  //  ES5 way to get a copy of the persons array
    const persons = [...this.state.persons]; // ES6 way to get a copy of the persons array
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  }

  // Using an arrow function means the method will always return into the
  // App class (binds it to the App class)
  togglePersonsHandler = () => {
    // Get the current boolean value of showPersons, change it to the opposite,
    // then reassign it to showPersons.
    const show = this.state.showPersons;
    this.setState({showPersons: !show});
  }

  render() {
    // persons will be reset each time the button is clicked because
    // the state will change and so the component will rerender.
    // This approach keeps the returned JSX clean / minimal.
    let persons = null;
    let btnClass = '';

    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            // The key prop has to be on the outer component
            return <ErrorBoundary key={person.id}>
              <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              changed={(event) => this.nameChangedHandler(event, person.id)}
              />
            </ErrorBoundary>
          })}
        </div>
      )
      btnClass = classes.red;
    }

    let assignedClasses = [];
    if(this.state.persons.length <= 2) {
      assignedClasses.push(assignedClasses.red);
    }
    if(this.state.persons.length <= 1) {
      assignedClasses.push(assignedClasses.bold);
    }

    return (
        <div className={classes.App}>
          <h1>Hi, I&#39;m a React App</h1>
          <p className={assignedClasses.join(' ')}>This is really working!</p>
          <button 
            className={btnClass}
            onClick={this.togglePersonsHandler}
          >Toggle Persons
          </button>
          {persons}
        </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

// We wrap person in a higer-order component that provides person with extra 
// functionality e.g. can use css pseudo-classes in inline JS styling.
export default App;
