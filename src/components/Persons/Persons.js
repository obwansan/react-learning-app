import React, {Component} from 'react';
import Person from './Person/Person';

class Persons extends Component {

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[Persons.js] shouldComponentUpdate');
    return true;
  }

  // Can save some data (e.g. user's scroll position) before the component
  // rerenders. It's automatically returned to the snapshot argument in 
  // componentDidUpdate which can update the DOM with this data after the 
  // DOM has been rerendered.
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');
    return { message: 'Snapshot!'};
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  }

  render() {
    console.log('[Persons.js] rendering...');
    return this.props.persons.map((person, index) => {
      return (
        <Person 
          click={() => this.props.clicked(index)}
          name={person.name} 
          age={person.age} 
          key={person.id}
          changed={(event) => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons; 