import React from 'react';
import * as Sentry from '@sentry/browser';
import SentryFeedbackButton from './sentryButton';
import { Container } from 'react-bootstrap';
import EntireAppCatcher from './entire';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(err) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // log to somewhere
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  // need to remove the error, otherwise when we go home the error is still there
  // and the error boundary will still show
  removeErrorAndGoHome = (cb) => {
    this.setState({
      hasError: false,
    });
    cb();
  };

  render() {
    const { hasError } = this.state;
    const { children, Fallback } = this.props;

    if (hasError) {
      return (
        <Fallback
          removeErrorAndGoHome={this.removeErrorAndGoHome}
          eventId={this.state.eventId}
        />
      );
    }

    return children;
  }
}

const DefaultFallback = ({ eventId }) => (
  <Container className="d-flex justify-content-center">
    <div>
      <h2>Whoops...</h2>
      <div>Something went wrong...</div>
      <SentryFeedbackButton eventId={eventId} />
    </div>
  </Container>
);

const withErrorBoundary = (Comp, FallbackErrorArg) => ({
  FallbackError: FallbackErrorProp,
  ...rest
}) => {
  let FallbackError = DefaultFallback;
  if (FallbackErrorArg) {
    FallbackError = FallbackErrorArg;
  }
  if (FallbackErrorProp) {
    FallbackError = FallbackErrorProp;
  }
  return (
    <ErrorBoundary Fallback={FallbackError}>
      <Comp {...rest} />
    </ErrorBoundary>
  );
};

export default withErrorBoundary;
export { EntireAppCatcher };
