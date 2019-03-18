import React from 'react';
import PropTypes from 'prop-types';

const Location = ({ location }) => {
  return (
    <li className="location">
      {location}
    </li>
  );
};

Location.propTypes = {
  location: PropTypes.string,
};

Location.defaultProps = {
  location: '',
};

export default Location;
