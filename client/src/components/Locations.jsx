import React from 'react';
import PropTypes from 'prop-types';
import Location from './Location';

const Locations = ({ locations }) => {
  const classes = `locations ${!locations.length ? 'hidden' : ''}`;

  const locationComponents = [];

  for (let i = 0; i < locations.length; i++) {
    locationComponents.push(<Location location={locations[i]} key={i} />);
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
};

Locations.defaultProps = {
  locations: [],
};

export default Locations;
