import React, {Component} from 'react';

// This is used primarily for errors in production. If a single React component
// fails, a custom error message can be shown if it's wrapped in an ErrorBoundary
// rather than the whole app failing.
class ErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: ''
  }

  componentDidCatch = (error, info) => {
    this.setState({
      hasError: true,
      errorMessage: error
    });
  }

  render() {
    if(this.state.hasError) {
      return <h1>{this.state.errorMessage}</h1>
    } else {
      return this.props.children;
    }
  }
}

export default ErrorBoundary;