import React from 'react';
import PropTypes from 'prop-types';

const LocationListEntry = ({ location }) => {
  return (
    <div className="locationListEntry">
      {location}
    </div>
  );
};

LocationListEntry.propTypes = {
  location: PropTypes.string,
};

LocationListEntry.defaultProps = {
  location: '',
};

export default LocationListEntry;
