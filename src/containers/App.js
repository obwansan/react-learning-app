import React, { Component } from 'react';
// The CSS rules from App.css are converted into a JS object that is scoped to the App component. This happens because we enabled CSS modules in the webpack config. By importing App.css as 'some name' (e.g. classes), the localIdentName option creates an App component-specific JS object. Each CSS rule is converted into a property on the classes object. The classes object is 'scoped' / 'namespaced' / made unique to the App component by combining the name of each CSS rule (selector) with the name of the file it's imported into (local) and hashed.
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import withClass from '../hoc/withClass';
import Aux from '../hoc/Aux';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');

  }

  state = {
    persons: [
      { id: 'asd1', name: 'Max', age: 28 },
      { id: 'dfg2', name: 'Manu', age: 29 },
      { id: 'cvb3', name: 'Stephanie', age: 26 }
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true
  };

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount() {
    console.log('[App.js] componentDidMount')
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

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

    // Update state (overwrite current persons array with new updated persons array)
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
    console.log('[App.js] render');
    // persons will be reset each time the button is clicked because
    // the state will change and so the component will rerender.
    // This approach keeps the returned JSX clean / minimal.
    let persons = null;

    if(this.state.showPersons) {
      persons = <Persons
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.nameChangedHandler}
          />
    }

    return (
      <Aux>
      {/* <WithClass classes={classes.App}> */}
        {/* <div className={classes.App}> */}
          <button 
            onClick={() => {
              this.setState({showCockpit: false})}
            }
          >
            Remove cockpit
          </button>
          {this.state.showCockpit ? 
            <Cockpit 
              title={this.props.title}
              clicked={this.togglePersonsHandler}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
            /> : null }
          {persons}
        {/* </div> */}
        {/* </WithClass> */}
      </Aux> 
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

// We wrap person in a higer-order component that provides person with extra 
// functionality e.g. can use css pseudo-classes in inline JS styling.
export default withClass(App, classes.App);
