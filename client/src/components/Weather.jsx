import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({ location, temperature, summary, saveLocation }) => {
  const classes = `weather ${!temperature ? 'hidden' : ''}`;

  return (
    <div className={classes}>
      <span>
        <strong>
          {temperature}
          &deg;F&nbsp;
        </strong>
        and&nbsp;
        <strong>{summary.toLowerCase()}</strong>
        &nbsp;in&nbsp;
        {location}
        .
      </span>
      <button type="button" className="button is-small is-link is-outlined" onClick={() => saveLocation(location)}>
        <span className="icon is-small">
          <i className="fas fa-check" />
        </span>
        <span>
          Save
        </span>
      </button>
    </div>
  );
};

Weather.propTypes = {
  location: PropTypes.string,
  temperature: PropTypes.number,
  summary: PropTypes.string,
  saveLocation: PropTypes.func,
};

Weather.defaultProps = {
  location: '',
  temperature: NaN,
  summary: '',
  saveLocation: () => {},
};

export default Weather;
