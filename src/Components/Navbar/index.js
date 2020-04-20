import React, { useContext } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../Authentication';
import Login from '../Login';
import withInit from '../Init';
import { ROUTES } from '../../Constants';

const HeaderContainer = () => {
  const { isAuthenticated } = useContext(UserContext);
  return <HeaderView isAuthenticated={isAuthenticated} />;
};

const HeaderView = ({ isAuthenticated }) => (
  <Navbar bg="light" expand="md">
    <Navbar.Brand href={ROUTES.HOME}>Graphz n Sh</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-auto"></Nav>
      <NavbarProfileView isAuthenticated={isAuthenticated} />
    </Navbar.Collapse>
  </Navbar>
);

const NavbarProfileBase = ({ isAuthenticated }) => (
  <>{isAuthenticated ? <UserProfileContainer /> : <GuestProfile />}</>
);

const NavbarProfileInit = () => <div></div>;

const NavbarProfileView = withInit(
  NavbarProfileBase,
  NavbarProfileInit,
);

const UserProfileContainer = () => {
  const { user } = useContext(UserContext);
  return (
    <UserProfileView
      username={user.userInfo.id}
      image={user.userInfo.images[0].url}
    />
  );
};
const UserProfileView = ({ username, image }) => (
  <Link className="btn btn-sm btn-outline-dark" to={ROUTES.PROFILE}>
    {`${username} `}
    <img
      src={image}
      height={30}
      width={30}
      className="img-fluid"
      alt="profile"
    />
  </Link>
);

const GuestProfile = () => <Login />;

export default HeaderContainer;
