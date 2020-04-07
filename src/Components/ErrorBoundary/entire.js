import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import SentryFeedbackButton from './sentryButton';
import { UserContext } from '../Authentication';
import { ROUTES } from '../../Constants';
import './styles.css';

// The wrapper that goes around the entire app if it crashes
const EntireAppCatcher = ({ removeErrorAndGoHome, eventId }) => {
  const history = useHistory();
  const { logout } = useContext(UserContext);
  function handleClick() {
    removeErrorAndGoHome(() => {
      logout();
      history.push(ROUTES.HOME);
    });
  }
  return (
    <div className="d-flex justify-content-center height-100">
      <div className="d-flex flex-wrap align-content-center">
        <div>
          <div>
            <h2>Whoops...</h2>
          </div>
          <div></div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleClick}
              className="btn btn-sm btn-success mr-1"
            >
              Home
            </button>
            <SentryFeedbackButton
              className="btn btn-sm btn-danger"
              eventId={eventId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EntireAppCatcher;
