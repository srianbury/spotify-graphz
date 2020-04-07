import React, { useState } from 'react';
import { PlaylistViewBase } from '../Playlist';
import { EXAMPLES } from '../../Constants';

const PlaylistExample = () => {
  const [filter, setFilter] = useState(null);
  return (
    <PlaylistViewBase
      image={EXAMPLES.EXAMPLE.image}
      title={EXAMPLES.EXAMPLE.title}
      tracks={EXAMPLES.EXAMPLE.tracks}
      numTracks={EXAMPLES.EXAMPLE.numTracks}
      filter={filter}
      setFilter={setFilter}
    />
  );
};

export default PlaylistExample;
