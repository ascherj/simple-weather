import React from 'react';
import PropTypes from 'prop-types';

const TempToggle = ({ isFahrenheit, toggleTemp }) => {
  const fahrenheitClasses = `button ${isFahrenheit ? 'is-dark is-selected' : ''}`;
  const celsiusClasses = `button ${!isFahrenheit ? 'is-dark is-selected' : ''}`;
  return (
    <div className="temp-toggle buttons has-addons">
      <button type="button" className={fahrenheitClasses} onClick={toggleTemp}>
        &deg;F
      </button>
      <button type="button" className={celsiusClasses} onClick={toggleTemp}>
        &deg;C
      </button>
    </div>
  );
};

TempToggle.propTypes = {
  isFahrenheit: PropTypes.bool,
  toggleTemp: PropTypes.func,
};

TempToggle.defaultProps = {
  isFahrenheit: true,
  toggleTemp: () => {},
};

export default TempToggle;
