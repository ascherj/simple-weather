import React from 'react';
import PropTypes from 'prop-types';

const Location = ({ location, getWeather }) => {
  return (
    <li className="location">
      <button type="button" className="button location-name is-outlined" onClick={() => getWeather(location)}>
        {location}
      </button>
      &nbsp;
      <button type="button" className="button is-small is-danger is-outlined">
        <span className="icon is-small">
          <i className="fas fa-times" />
        </span>
      </button>
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
