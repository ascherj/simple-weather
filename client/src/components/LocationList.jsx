import React from 'react';

const LocationList = ({ locations }) => {
  const classes = `locationList ${!locations.length ? 'hidden' : ''}`;

  return (
    <div className={classes}>
      <h3 className="title is-3">Saved Locations</h3>
      {locations}
    </div>
  );
};

export default LocationList;
