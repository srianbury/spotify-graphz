import React from 'react';
import { Container } from 'react-bootstrap';
import Playlists from '../Playlists';
import About from '../About';
import withAuthorization from '../Authorization';

const Home = () => (
  <Container fluid>
    <Playlists />
  </Container>
);

export default withAuthorization(Home, About);
