import React from 'react';
import PropTypes from 'prop-types';

const Skycon = ({ icon }) => {
  const classes = !icon ? 'hidden' : '';
  const skycons = new Skycons({ color: '#363636' });
  skycons.add('skycon', icon);
  skycons.play();

  return (
    <canvas id="skycon" className={classes} width="128" height="128" />
  );
};

Skycon.propTypes = {
  icon: PropTypes.string,
};

Skycon.defaultProps = {
  icon: '',
};

export default Skycon;
