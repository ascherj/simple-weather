import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';

const Locations = ({ locations, getWeather, deleteLocation }) => {
  const classes = `locations ${!locations.length ? 'hidden' : ''}`;

  const locationComponents = [];

  for (let i = 0; i < locations.length; i++) {
    locationComponents.push(<Location location={locations[i]} getWeather={getWeather} deleteLocation={deleteLocation} key={i} />);
  }

  return (
    <div className={classes}>
      <h3 className="title is-3">Saved Locations</h3>
      <ul>
        {locationComponents}
      </ul>
    </div>
  );
};

Locations.propTypes = {
  locations: PropTypes.instanceOf(Array),
  getWeather: PropTypes.func,
  deleteLocation: PropTypes.func,
};

Locations.defaultProps = {
  locations: [],
  getWeather: () => {},
  deleteLocation: () => {},
};

export default Locations;
