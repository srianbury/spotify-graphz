import React, { useContext } from 'react';
import { UserContext } from '../Authentication';
import { AUTH_STATES } from '../../Constants';

const withInit = (Component, Init) => (props) => {
  const { user } = useContext(UserContext);
  if (user === AUTH_STATES.INIT) {
    return <Init />;
  }
  return <Component {...props} />;
};

export default withInit;
