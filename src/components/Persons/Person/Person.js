// React.Fragment is built into React 16. It works exactly like our <aux> component under the hood.
import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

// The CSS rules from Person.css are converted into a JS object that is scoped to the Person component.
import classes from './Person.css';
// import aux from '../../../hoc/Aux';
import withClass from '../../../hoc/withClass';
import AuthContext from '../../../context/auth-context';


class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  componentDidMount() {
    // this.inputElement.focus();
    this.inputElementRef.current.focus();
  }


  render() {
    console.log('[Person.js] rendering...')
    return (
      // <div className={classes.person}>
      // <aux>
      <Fragment>
        <AuthContext.Consumer>
          {/* The authenticated value is set in authContext.Provider */}
          {/* AuthContext.Consumer passes context to an anonymous function that returns
          the JSX code. */}
          {context => context.authenticated ? <p>Authenticated!</p> : <p>Please log in</p>}
        </AuthContext.Consumer>

        <p onClick={this.props.click}>
          I&#39;m {this.props.name} and I am {this.props.age} years old
        </p>
        {/* props.children accesses whatever text or HTML is between the React
        component opening and closing tags */}
        <p>{this.props.children}</p>
        <input 
          // ref={(inputEl) => {this.inputElement = inputEl}}
          ref={this.inputElementRef}
          type="text" 
          onChange={this.props.changed} 
          value={this.props.name} 
        />
      {/* </div> */}
      </Fragment>
      // </aux>
    )
  }
}

// propTypes has to be lowercase here
Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
}

export default withClass(Person, classes.person);