import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    return this.state.hasError ? (
      <ErrorHandler error={this.state.error} />
    ) : (
      this.props.children
    );
  }
}
export default ErrorBoundary;

const ErrorHandler = ({ error }) => {
  const returnHome = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };
  return (
    <div id='errorHandler'>
      <h1>Oops!</h1>
      <h2>Something went wrong :(</h2>
      <div className='printError'>{error.message}</div>
      <div className='printError'>{error.stack}</div>

      <button className='btn' onClick={returnHome}>
        Return home
      </button>
    </div>
  );
};
