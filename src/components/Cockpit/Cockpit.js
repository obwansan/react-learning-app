import React, {useEffect} from 'react';
// CSS Modules: Loads the CSS rules in as a JS object called classes.
// Can access individual rules as properties on the object.
import classes from './Cockpit.css'

const cockpit = (props) => {
  // useEffect seems to do everything that the class-based component 
  // lifecycle methods componentDidMount and componentDidUpdate do 
  // (it runs on every state update / rerender)
  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    const timer = setTimeout(() => {
      alert('Saved data to cloud!');
    }, 1000);
    return () => {
      // clearTimeout(timer); // If you click the 'Remove Cockpit' button before setTimeout runs, the cockpit component is unmounted, this useEffect cleanup return function runs, and the timeout is cleared before the alert can run.
      console.log('[Cockpit.js] cleanup work in useEffect'); // runs when the component unmounts
    };
  // }, [props.persons]); // only calls useEffect if props.persons changes
}, []); // only calls useEffect on first component render and component unmount  (equivalent of componentDidMount)

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
        className={btnClass}
        onClick={props.clicked}
      >Toggle Persons
      </button>
    </div>
  );
};

// memoization caches a copy/snapshot of the component and only rerenders it if 
// its inputs (props) change. If they don't, React will 'return' the stored component.
// Prevents unnecessary re-rendering and improves optimization.
// Good to wrap functional child components in React.memo so they only re-render when 
// they change, not when only props or state in the parent element changes.
export default React.memo(cockpit);