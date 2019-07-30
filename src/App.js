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
    otherState: 'some other value'
  };

  switchNameHandler = (newName) => {
    // console.log('Was clicked!');
    // DON'T DO THIS: this.state.persons[0].name = 'Maximilian';
    this.setState({
      persons: [
        { name: newName, age: 28 },
        { name: 'Manu', age: 29 },
        { name: 'Stephanie', age: 27 }
      ]
    });
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

  render() {
    // Can use inline styles like this when you want to restrict the scope of the 
    // style to a single component or element within a component. Note that this is 
    // a JS object with camelCase keys and string values, that is converted (somewhow)
    // by React into CSS when assigned to the style attribute on the element.
    // But makes it hard to do complex styling with pseudo-classes etc.
    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        {/* on click, the anonymous function is invoked and returns the invoked 
         switchNameHandler function, which can be passed an argument. */}
        <button 
          style={style}
          onClick={() => this.switchNameHandler('Maximillian!!!')}
        >Switch Name</button>
        <Person
          name={this.state.persons[0].name}
          age={this.state.persons[0].age}
        />
        <Person
          name={this.state.persons[1].name}
          age={this.state.persons[1].age}
          // Another way to pass the name into switchNameHandler, but a bit more performant 
          // then the arrow-function as it doesn't cause React to re-render as much. It binds
          // switchNameHandler to the App class so when it's called in Person.js it can access
          // this.setState to change the state in App ('lifting state up').
          click={this.switchNameHandler.bind(this, 'Max!')}
          changed={this.nameChangedHandler}
        >
          My Hobbies: Racing
        </Person>
        <Person
          name={this.state.persons[2].name}
          age={this.state.persons[2].age}
        />
      </div>
    );
    // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Does this work now?'));
  }
}

export default App;
