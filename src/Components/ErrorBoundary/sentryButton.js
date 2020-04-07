import React from 'react';
import * as Sentry from '@sentry/browser';

const SentryFeedbackButton = ({ eventId, className }) => (
  <button
    className={className ? className : 'btn btn-sm btn-danger'}
    onClick={() => Sentry.showReportDialog({ eventId })}
  >
    Report feedback
  </button>
);

export default SentryFeedbackButton;
