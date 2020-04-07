import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { UserContext } from '../Authentication';
import Table from './table';
import Pie from './graph';
import withLoading from 'react-with-loading-hoc';
import Skeleton from 'react-loading-skeleton';

const PlaylistContainer = () => {
  const { user, login } = useContext(UserContext);
  const { access_token } = user.spotifyAuth;
  const { id } = useParams();
  const [data, setData] = useState({
    title: null,
    tracks: [],
    numTracks: null,
    image: null,
    loading: true,
  });
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    async function getAllTracks() {
      async function getTracks(offset) {
        const first = offset === 0 ? true : false;
        const url = first
          ? `https://api.spotify.com/v1/playlists/${id}`
          : `https://api.spotify.com/v1/playlists/${id}/tracks?limit=${LIMIT}&offset=${offset}`;
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        const result = await response.json();
        const total = first ? result.tracks.total : 0;
        const tracks = first ? result.tracks.items : result.items;
        const title = first ? result.name : null;
        const image = first ? result.images[0].url : null;
        return {
          total,
          tracks,
          title,
          image,
        };
      }
      const LIMIT = 100;
      let offset = 0;
      let allTracks = null;
      let numTracks = null;
      let playlistTitle = null;
      let playlistImage = null;

      while (allTracks === null || allTracks.length < numTracks) {
        const { image, title, total, tracks } = await getTracks(
          offset * LIMIT,
        );

        if (allTracks === null) {
          allTracks = tracks;
        } else {
          allTracks = [...allTracks, ...tracks];
        }

        if (numTracks === null) {
          numTracks = total;
        }
        if (playlistTitle === null) {
          playlistTitle = title;
        }
        if (playlistImage === null) {
          playlistImage = image;
        }
        offset++;
      }
      setData({
        title: playlistTitle,
        tracks: allTracks,
        numTracks,
        image: playlistImage,
        loading: false,
      });
    }
    getAllTracks();
  }, [id, access_token, login]);

  return (
    <PlaylistView
      image={data.image}
      title={data.title}
      tracks={data.tracks}
      numTracks={data.numTracks}
      filter={filter}
      setFilter={setFilter}
      loading={data.loading}
      LoadingFallback={LoadingSkeleton}
    />
  );
};

const PlaylistViewBase = ({
  image,
  title,
  tracks,
  numTracks,
  filter,
  setFilter,
}) => (
  <div>
    <PlaylistTitle
      image={image}
      title={title}
      numTracks={numTracks}
    />
    <Pie
      items={tracks}
      filter={filter}
      setFilter={applyFilter(setFilter)}
    />
    <Table
      items={tracks.filter((node) => filterData(filter, node))}
    />
  </div>
);

const PlaylistTitle = ({ image, title, numTracks }) => (
  <div className="m-1">
    <div className="d-flex justify-content-center">
      <h3 className="d-flex align-items-center">{`${title} (${numTracks})`}</h3>
    </div>
    <div className="d-flex justify-content-center">
      <img
        src={image}
        alt="playlist cover"
        height={75}
        width={75}
        className="img-fluid p-1"
      />
    </div>
  </div>
);

const LoadingSkeleton = () => (
  <Container>
    <Skeleton height={50} />
    <div className="d-flex justify-content-center">
      <Skeleton circle={true} height={250} width={250} />
    </div>
    <Skeleton height={50} count={5} />
  </Container>
);

const PlaylistView = withLoading(PlaylistViewBase);

function filterData(filter, node) {
  if (
    filter === null ||
    node.track.artists.map((artist) => artist.name).includes(filter)
  ) {
    return node;
  }
}

const applyFilter = (setFilter) => (value) => {
  setFilter((prev) => {
    if (prev === value) {
      return null;
    }
    return value;
  });
};

export default PlaylistContainer;
export { PlaylistViewBase };
