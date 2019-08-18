import React from 'react';

// Creates a JS object that can be passed between components without using props.
// Set the default values for properties in case they're not set.
const authContext = React.createContext(
  {
    authenticated:false,
    login: () => {}
  });

export default authContext;