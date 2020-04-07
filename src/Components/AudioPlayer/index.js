import React from 'react';
import RH5AudioPlayer from 'react-h5-audio-player';
import './styles.css';

/*
  rhap_button-clear 
  rhap_main-controls-button
  rhap_play-pause-button
*/

const AudioPlayer = ({ src }) => (
  <div className="d-flex flex-wrap h-100 align-content-center">
    {src && (
      <RH5AudioPlayer
        src={src}
        customProgressBarSection={[null, null, null]}
        customIcons={{
          rewind: <></>,
          forward: <></>,
          previous: <></>,
          next: <></>,
          loop: <></>,
          loopOff: <></>,
          volume: <></>,
          volumeMute: <></>,
        }}
        customVolumeControls={[null]}
      />
    )}
  </div>
);

export default AudioPlayer;
