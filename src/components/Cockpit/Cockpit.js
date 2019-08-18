import React, { useEffect, useRef, useContext } from 'react';
// CSS Modules: Loads the CSS rules in as a JS object called classes.
// Can access individual rules as properties on the object.
import classes from './Cockpit.css'
import AuthContext from '../../context/auth-context';

const cockpit = props => {
  const toggleBtnRef = useRef(null);
  // Can use the useContext hook in functional components as you can only use 
  // static contextType in class-based components
  const authContext = useContext(AuthContext);

  // When you click the login button in Cockpit the loginHandler runs because it has been
  // assigned to authContext.login in authContext.Provider in App. The loginHandler sets the
  // value of state.authenticated. This automatically updates the value of authContext.authenticated
  // in authContext.Provider in App. Therefore the value of authContext.authenticated here will also
  // update as we're importing it / using it and it will be re-imported on each render cycle.
  console.log('authContext.authenticated:', authContext.authenticated);

  // The useEffect hook seems to do everything that the class-based component 
  // lifecycle methods componentDidMount and componentDidUpdate do 
  // (it runs after every state update / rerender cycle)
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // This clicks the button after the cockpit component renders. If we called it outside
    // the useEffect() hook in a functional component, it would run before the JSX was rendered
    // and so you'd get an error because the button element that toggleBtnRef refers to wouldn't 
    // exist.
    toggleBtnRef.current.click();
    return () => {
      // clearTimeout(timer); // If you click the 'Remove Cockpit' button before setTimeout runs, the cockpit component is unmounted, this useEffect cleanup return function runs, and the timeout is cleared before the alert can run.
      console.log('[Cockpit.js] cleanup work in useEffect'); // runs when the component unmounts
    };
  // }, [props.persons]); // Only calls useEffect if props.persons changes
}, []); 
// Passing an empty array as the second arrgument to useEffect() means it's only called on 
// the first component render and on component unmount (i.e. equivalent of componentDidMount)
// rather than on every component re-render cycle.

  const assignedClasses = [];
  let btnClass = '';
  if(props.showPersons) {
    btnClass = classes.red;
  }

  if(props.personsLength <= 2) {
    assignedClasses.push(classes.red);
  }
  if(props.personsLength <= 1) {
    assignedClasses.push(classes.bold);
  }

  return (
    // Scopes the Cockpit CSS classes to the cockpit component
    <div className={classes.Cockpit}> 
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button 
        ref={toggleBtnRef}
        className={btnClass}
        onClick={props.clicked}
      >Toggle Persons
      </button>
        <button onClick={authContext.login}>Log in</button>
    </div>
  );
};

// memoization caches a copy/snapshot of the component and only rerenders it if 
// its inputs (props) change. If they don't, React will 'return' the stored component.
// Prevents unnecessary re-rendering and improves optimization.
// Good to wrap functional child components in React.memo so they only re-render when 
// they change, not when only props or state in the parent element changes.
export default React.memo(cockpit);