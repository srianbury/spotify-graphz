import React, { useContext } from 'react';
import { Button } from 'react-bootstrap';
import { UserContext } from '../Authentication';

const LoginContainer = () => {
  const { login } = useContext(UserContext);
  return <LoginView login={login} />;
};

const LoginView = ({ login }) => (
  <div>
    <Button variant="success" size="sm" onClick={login}>
      Login
    </Button>
  </div>
);

export default LoginContainer;
