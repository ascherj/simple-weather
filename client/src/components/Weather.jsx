import React from 'react';

const Weather = ({ location, temperature }) => {
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
    </div>
  );
};

export default Weather;
