import React, { useContext } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { UserContext } from '../Authentication';

const ProfileContainer = () => {
  const { user, logout } = useContext(UserContext);
  return <ProfileView user={user} logout={logout} />;
};

const ProfileView = ({ user, logout }) => (
  <Container className="m-1">
    <Row className="d-flex justify-content-center">
      <Col className="col-6 col-md-2 d-flex justify-content-center">
        <img
          src={user.userInfo.images[0].url}
          className="img-fluid"
          alt="profile"
        />
      </Col>
    </Row>
    <Row className="d-flex justify-content-center">
      <h3>{user.userInfo.id}</h3>
    </Row>
    <Row className="d-flex justify-content-center">
      <button className="btn btn-sm btn-dark" onClick={logout}>
        Logout
      </button>
    </Row>
  </Container>
);

export default ProfileContainer;
