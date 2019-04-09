import React from 'react';
import PropTypes from 'prop-types';

const TempToggle = ({ toggleTemp }) => {
  return (
    <span className="temp-toggle">
      <button type="button" className="button" onClick={toggleTemp}>
        Toggle F&deg;/C&deg;
      </button>
    </span>
  );
};

TempToggle.propTypes = {
  toggleTemp: PropTypes.bool,
};

TempToggle.defaultProps = {
  toggleTemp: true,
};

export default TempToggle;
