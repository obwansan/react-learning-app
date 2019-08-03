import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  state = {
    persons: [
      { name: 'Max', age: 28 },
      { name: 'Manu', age: 29 },
      { name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false
  };

  // When you type in the input field, the onChange attribute is 'triggered', calling
  // props.changed, which is the nameChangedHandler method. The event target is the 
  // input field so its value (event.target.value) is the entered characters. Each keypress
  // triggers the onChange attribute, passes the event object to nameChangedHandler, the name
  // value is updated with the event.target.value, and this change in state causes the app to
  // re-render, displaying each new character as it's typed.
  nameChangedHandler = (event) => {
    this.setState({
      persons: [
        { name: 'Max', age: 28 },
        { name: event.target.value, age: 29 },
        { name: 'Stephanie', age: 26 }
      ]
    });
  }

  // NOTE: "The value of a constant cannot change through re-assignment, 
  // and a constant cannot be re-declared." But when you're adding to an array 
  // or object you're not re-assigning or re-declaring the constant, it's 
  // already declared and assigned, you're just adding to the "list" that the 
  // constant points to. What makes the const a const is that it will always 
  // point to the same array or object (a let variable could be reassigned a 
  // different array, object etc, or redeclared). The properties of the array or 
  // object itself are free to change.
  deletePersonHandler = (personIndex) => {
    const persons = this.state.persons;
    persons.splice(personIndex, 1); // splice modifies the original array
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
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
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
              age={person.age} />
          })}
        </div>
      )
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}
        >Toggle Persons
        </button>
        {persons}
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
