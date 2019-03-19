import React from 'react';
import PropTypes from 'prop-types';

const Location = ({ location, getWeather, deleteLocation }) => {
  return (
    <li className="location">
      <button type="button" className="button location-name is-outlined" onClick={() => getWeather(location)}>
        {location}
      </button>
      &nbsp;
      <button type="button" className="button is-small is-danger is-outlined" onClick={() => deleteLocation(location)}>
        <span className="icon is-small">
          <i className="fas fa-times" />
        </span>
      </button>
    </li>
  );
};

Location.propTypes = {
  location: PropTypes.string,
  getWeather: PropTypes.func,
  deleteLocation: PropTypes.func,
};

Location.defaultProps = {
  location: '',
  getWeather: () => {},
  deleteLocation: () => {},
};

export default Location;
