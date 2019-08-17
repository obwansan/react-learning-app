import React from 'react';

// A regular JS component that returns a functional component
const withClass = (WrappedComponent, className) => {
  // eslint-disable-next-line react/display-name
  return props => (
    <div className={className}>
      {/* The props object is split out into the individual props. These are the props
      that have been passed into the component, e.g. into the Person component in the 
      Persons component. */}
      <WrappedComponent {...props} />
    </div>
  );
};

export default withClass;