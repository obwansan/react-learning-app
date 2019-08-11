import React, {Component} from 'react';
// The CSS rules from App.css are converted into a JS object that is scoped to the Person component.
import classes from './Person.css';

class Person extends Component {
  render() {
    console.log('[Person.js] rendering...')
    return (
      <div className={classes.person}>
        <p onClick={this.props.click}>I&#39;m {this.props.name} and I am {this.props.age} years old</p>
        {/* props.children accesses whatever text or HTML is between the React
        component opening and closing tags */}
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      </div>
    )
  }
}

export default Person;