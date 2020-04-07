import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../Authentication';
import withAuthorization from '../Authorization';
import { Container } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import withLoading from 'react-with-loading-hoc';

const LIMIT = 20;

const PlaylistsContainer = () => {
  const [playlists, setPlaylists] = useState({
    items: [],
    total: null,
    loading: true,
  });
  const [offset, setOffset] = useState(0);
  const { access_token } = useContext(UserContext).user.spotifyAuth;
  function fetchMore() {
    setOffset((prev) => ++prev);
  }
  useEffect(() => {
    async function read() {
      const response = await fetch(
        `https://api.spotify.com/v1/me/playlists?limit=${LIMIT}&offset=${
          offset * LIMIT
        }`,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        },
      );
      const result = await response.json();
      setPlaylists((prev) => ({
        items: [...prev.items, ...result.items],
        total: result.total,
        loading: false,
      }));
    }
    read();
  }, [offset, access_token]);
  return (
    <PlaylistsView
      loading={playlists.loading}
      playlists={playlists.items}
      fetchMore={fetchMore}
      hasMore={playlists.items.length < playlists.total}
      LoadingFallback={PlaylistLoading}
    />
  );
};

const PlaylistsViewBase = ({ playlists, fetchMore, hasMore }) => (
  <Container fluid>
    <h3>Your Playlists</h3>
    <div className="row d-flex justify-content-center">
      {playlists.map((playlist) => (
        <Link
          key={playlist.id}
          to={`/playlist/${playlist.id}`}
          className="col-6 col-md-4 col-lg-3"
        >
          <div className="card m-1">
            <img
              className="card-img-top img-fluid"
              src={playlist.images[0] && playlist.images[0].url}
              alt={playlist.name}
            />
            <div className="card-body text-truncate">
              {playlist.name}
            </div>
          </div>
        </Link>
      ))}
    </div>
    <div className="d-flex justify-content-center m-4">
      {hasMore && (
        <button
          className="btn btn-success btn-sm"
          onClick={fetchMore}
        >
          Load More
        </button>
      )}
    </div>
  </Container>
);
const PlaylistsView = withLoading(PlaylistsViewBase);

const ph = [1, 2, 3, 4, 5, 6, 7, 8];
const PlaylistLoading = () => (
  <Container fluid>
    <h3>Your Playlists</h3>
    <div className="row d-flex justify-content-center">
      {ph.map((_) => (
        <div key={_} className="col-6 col-md-4 col-lg-3 mb-2">
          <Skeleton height={100} />
        </div>
      ))}
    </div>
  </Container>
);

export default withAuthorization(PlaylistsContainer);
