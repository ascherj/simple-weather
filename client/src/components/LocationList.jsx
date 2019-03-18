import React from 'react';
import PropTypes from 'prop-types';

const LocationList = ({ locations }) => {
  const classes = `locationList ${!locations.length ? 'hidden' : ''}`;

  return (
    <div className={classes}>
      <h3 className="title is-3">Saved Locations</h3>
      {locations}
    </div>
  );
};

LocationList.propTypes = {
  locations: PropTypes.instanceOf(Array),
};

LocationList.defaultProps = {
  locations: [],
};

export default LocationList;
