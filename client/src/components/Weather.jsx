import React from 'react';

const Weather = ({ location, temperature, saveLocation }) => {
  const classes = `weather ${!temperature ? 'hidden' : ''}`;

  return (
    <div className={classes} >
      <span>
        It is currently&nbsp;
        {Math.round(temperature)}
        &nbsp;degrees in&nbsp;
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

export default Weather;
