import React from 'react';
import PropTypes from 'prop-types';

const Weather = (props) => {
  const {
    location, temperature, isFahrenheit, currentlySummary, hourlySummary, saveLocation, isSaved,
  } = props;
  const componentClasses = `weather ${!temperature ? 'hidden' : ''}`;
  const buttonClasses = `button is-small is-link is-outlined ${isSaved ? 'hidden' : ''}`;

  return (
    <div className={componentClasses}>
      <span>
        <strong>
          {temperature}
          &deg;
          {isFahrenheit ? 'F' : 'C'}
          &nbsp;
        </strong>
        and&nbsp;
        <strong>{currentlySummary.toLowerCase()}</strong>
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
      <div className="hourly">
        {hourlySummary}
      </div>
    </div>
  );
};

Weather.propTypes = {
  location: PropTypes.string,
  temperature: PropTypes.number,
  isFahrenheit: PropTypes.bool,
  currentlySummary: PropTypes.string,
  hourlySummary: PropTypes.string,
  saveLocation: PropTypes.func,
  isSaved: PropTypes.bool,
};

Weather.defaultProps = {
  location: '',
  temperature: NaN,
  isFahrenheit: true,
  currentlySummary: '',
  hourlySummary: '',
  saveLocation: () => {},
  isSaved: false,
};

export default Weather;
