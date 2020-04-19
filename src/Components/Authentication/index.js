import React, { useState, useEffect } from 'react';
import UserContext from './context';
import { STORAGE, AUTH_STATES } from '../../Constants';

const Authentication = ({ children }) => {
  const [user, setUser] = useState(AUTH_STATES.INIT); // AUTH_STATES.INIT

  function login() {
    function getRedirectBase() {
      return process.env.NODE_ENV === 'production'
        ? 'https://srianbury.github.io/spotify-graphz/callback'
        : 'http://localhost:3000/callback';
    }
    const base = 'https://accounts.spotify.com/authorize';
    const scopes = [
      'user-read-email',
      'user-library-read',
      'playlist-read-private',
    ];
    const paramsObj = {
      client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
      redirect_uri: getRedirectBase(),
      scope: scopes.join('%20'),
      response_type: 'token',
      state: 123,
    };
    const params = Object.entries(paramsObj)
      .map((kvp) => `${kvp[0]}=${paramsObj[kvp[0]]}`)
      .join('&');
    window.location.href = `${base}?${params}`;
    return null;
  }

  function logout() {
    setUser(AUTH_STATES.NOT_LOGGED_IN);
    localStorage.removeItem(STORAGE.USER);
  }

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem(STORAGE.USER));
    if (storedUser) {
      const { expires_at } = storedUser.spotifyAuth; // i.e. 2020-04-01T07:54:20.347Z
      const expDate = new Date(expires_at);
      if (new Date() >= expDate) {
        setUser(AUTH_STATES.NOT_LOGGED_IN);
      } else {
        setUser(storedUser); // (prev) => ({ ...prev, ...storedUser })
      }
    } else {
      setUser(AUTH_STATES.NOT_LOGGED_IN);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated: isAuthenticated(user),
        logout: logout,
        login: login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const withAuthentication = (Component) => (props) => (
  <Authentication>
    <Component {...props} />
  </Authentication>
);

function isAuthenticated(user) {
  return !!(
    user &&
    user.spotifyAuth &&
    user.spotifyAuth.access_token
  );
}

export default withAuthentication;
export { UserContext };
