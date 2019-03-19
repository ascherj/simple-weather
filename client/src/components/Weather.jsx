import React from 'react';
import PropTypes from 'prop-types';

const Weather = ({ location, temperature, summary, saveLocation, isSaved }) => {
  const componentClasses = `weather ${!temperature ? 'hidden' : ''}`;
  const buttonClasses = `button is-small is-link is-outlined ${isSaved ? 'hidden' : ''}`;

  return (
    <div className={componentClasses}>
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
      <button type="button" className={buttonClasses} onClick={() => saveLocation(location)}>
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
  isSaved: PropTypes.bool,
};

Weather.defaultProps = {
  location: '',
  temperature: NaN,
  summary: '',
  saveLocation: () => {},
  isSaved: false,
};

export default Weather;
