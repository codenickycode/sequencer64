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
  const reloadApp = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };
  return (
    <div id='errorHandler'>
      <div className='container'>
        <p>Oops!</p>
        <p>Something went wrong :(</p>
        <button className='btn' onClick={reloadApp}>
          Reload app
        </button>
      </div>
    </div>
  );
};
