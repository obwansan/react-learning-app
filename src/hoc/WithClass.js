import React from 'react';

// A regular JS component that returns a functional component
const withClass = (WrappedComponent, className) => {
  // eslint-disable-next-line react/display-name
  return props => (
    <div className={className}>
      <WrappedComponent />
    </div>
  );
};

export default withClass;