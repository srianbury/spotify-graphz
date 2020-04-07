import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../Authentication';
import { ROUTES } from '../../Constants';

const AboutContainer = () => {
  const { login } = useContext(UserContext);
  return <AboutView login={login} />;
};

const AboutView = ({ login }) => (
  <Container>
    <h2>About</h2>
    <div>Visualize the artist makeup in any playlist.</div>
    <div>
      <span className="btn btn-link p-0" onClick={login}>
        Login
      </span>{' '}
      to check it out or{' '}
      <Link to={ROUTES.EXAMPLE}>see an example</Link>!
    </div>
  </Container>
);
export default AboutContainer;
