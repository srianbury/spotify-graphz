import React, { useContext } from 'react';
import { UserContext } from '../Authentication';
import PleaseLogin from '../PleaseLogin';

const withAuthorization = (Component, Fallback = PleaseLogin) => (
  props,
) => {
  const { isAuthenticated } = useContext(UserContext);
  if (isAuthenticated) {
    return <Component {...props} />;
  }
  return <Fallback />;
};

export default withAuthorization;
