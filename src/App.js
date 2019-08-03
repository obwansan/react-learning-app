import React, { Component } from 'react';
// Radium enables us to use css pseudo-selectors inline
// StyleRoot enables us to use media-queries inline
import Radium, {StyleRoot} from 'radium'; 
import './App.css';
import Person from './Person/Person';

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
      return person.id === id;
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
    // Just passed as a prop to the button
    const style = {
      backgroundColor: 'green',
      color: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer',
      ':hover': {
        backgroundColor: 'lightgreen',
        color:  'black'
      }
    }

    // persons will be reset each time the button is clicked because
    // the state will change and so the component will rerender.
    // This approach keeps the returned JSX clean / minimal.
    let persons = null;
    if(this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person 
              click={() => this.deletePersonHandler(index)}
              name={person.name} 
              age={person.age} 
              key={person.id}
              changed={(event) => this.nameChangedHandler(event, person.id)}
            />
          })}
        </div>
      )
      style.backgroundColor = 'red';
      style[':hover'] = {
        backgroundColor: 'salmon',
        color: 'white'
      }
    }

    let classes = [];
    if(this.state.persons.length <= 2) {
      classes.push('red');
    }
    if(this.state.persons.length <= 1) {
      classes.push('bold');
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(' ')}>This is really working!</p>
          <button 
            style={style}
            onClick={this.togglePersonsHandler}
          >Toggle Persons
          </button>
          {persons}
        </div>
      </StyleRoot>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

// We wrap person in a higer-order component that provides person with extra 
// functionality e.g. can use css pseudo-classes in inline JS styling.
export default Radium(App);
