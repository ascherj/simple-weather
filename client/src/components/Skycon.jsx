import React from 'react';

const Skycon = ({ icon }) => {
  let skycons = new Skycons({ 'color': 'black' });
  skycons.add('skycon', icon);
  skycons.play();

  return (
    <canvas id="skycon" width="128" height="128" />
  );
};

export default Skycon;
