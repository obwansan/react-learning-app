import React, {PureComponent} from 'react';
import Person from './Person/Person';

// pureComponent does the same check as shouldComponentUpdate for all prop
// and only rerenders the component if one of them has changed.
class Persons extends PureComponent {

  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');
  //   return state;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log('[Persons.js] shouldComponentUpdate');
    // shouldComponentUpdate() is invoked before rendering when new props or state are received. Defaults to true.
    // Only rerender if the persons component has changed (this.state.persons in App).
    // if(nextProps.persons !== this.props.persons) {
    //   return true;
    // } else {
    //   return false;
    // }
  //   return true;
  // }

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
          isAuth={this.props.isAuthenticated}
        />
      );
    });
  }
}

export default Persons; 