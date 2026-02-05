import PropTypes from 'prop-types';
import { Component } from 'react';
import ErrorPage from '@/pages/ErrorPage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    const { onError } = this.props;
    onError?.(error, info);
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;

    if (!hasError) {
      return children;
    }

    const rawStatus = error?.status ?? error?.response?.status;
    const status = Number(rawStatus);
    const hasStatus = Number.isFinite(status);
    const isServerError = hasStatus && status >= 500;

    if (!hasStatus || isServerError) {
      return <ErrorPage />;
    }

    return null;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  onError: PropTypes.func,
};

ErrorBoundary.defaultProps = {
  onError: null,
};

export default ErrorBoundary;
