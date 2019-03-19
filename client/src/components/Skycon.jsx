import React from 'react';

const Skycon = ({ icon }) => {
  const classes = !icon ? 'hidden' : '';
  let skycons = new Skycons({ 'color': 'black' });
  skycons.add('skycon', icon);
  skycons.play();

  return (
    <canvas id="skycon" className={classes} width="128" height="128" />
  );
};

export default Skycon;
