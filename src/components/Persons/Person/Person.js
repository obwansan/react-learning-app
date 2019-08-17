import React, {Component, Fragment} from 'react';
// The CSS rules from App.css are converted into a JS object that is scoped to the Person component.
import classes from './Person.css';
import aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';

// React.Fragment is built into React 16. It works exactly like our <aux> component under the hood.

class Person extends Component {
  render() {
    console.log('[Person.js] rendering...')
    return (
      // <div className={classes.person}>
      // <aux>
      <Fragment>
        <p onClick={this.props.click}>I&#39;m {this.props.name} and I am {this.props.age} years old</p>
        {/* props.children accesses whatever text or HTML is between the React
        component opening and closing tags */}
        <p>{this.props.children}</p>
        <input type="text" onChange={this.props.changed} value={this.props.name} />
      {/* </div> */}
      </Fragment>
      // </aux>
    )
  }
}

export default withClass(Person, classes.person);