import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useLocation } from 'react-router-dom';
import { UserContext } from '../Authentication';
import { STORAGE, ROUTES } from '../../Constants';

const Callback = () => {
  const [isReady, setIsReady] = useState(false);
  const { setUser } = useContext(UserContext);
  const { hash } = useLocation();
  const spotifyAuth = getHashObject(hash);
  const { expires_in } = spotifyAuth;
  const expires_at = new Date();
  expires_at.setSeconds(expires_at.getSeconds() + expires_in * 0.9);
  spotifyAuth.expires_at = expires_at;

  useEffect(() => {
    let isMounted = true;
    read(spotifyAuth, setUser);
    if (isMounted) {
      setIsReady(true);
    }
    return () => {
      isMounted = false;
    };
  }, [spotifyAuth, setUser]);

  if (isReady) {
    return <Redirect to={ROUTES.HOME} />;
  }
  return <div></div>;
};

async function read(spotifyAuth, setUser) {
  const response = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${spotifyAuth.access_token}`,
    },
  });
  const userInfo = await response.json();
  const user = {
    spotifyAuth,
    userInfo,
  };
  setUser(user);
  localStorage.setItem(STORAGE.USER, JSON.stringify(user));
}

function getHashObject(hash) {
  const result = {};
  let hashString = hash.substring(1);
  const pairs = hashString.split('&');
  pairs.forEach((pair) => {
    const kvp = pair.split('=');
    const key = kvp[0];
    const value = kvp[1];
    result[key] = value;
  });
  return result;
}

export default Callback;
