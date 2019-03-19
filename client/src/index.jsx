import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search';
import Weather from './components/Weather';
import Locations from './components/Locations';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
      temperature: NaN,
      summary: '',
      locations: [],
    };
    this.getWeather = this.getWeather.bind(this);
    this.getLocations = this.getLocations.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
  }

  componentDidMount() {
    this.getLocations();
  }

  getWeather(location) {
    axios.get(`http://localhost:3000/weather?location=${location}`)
      .then((response) => {
        this.setState({
          currentLocation: response.data.formattedAddress,
          temperature: response.data.currentWeather.temperature,
          summary: response.data.currentWeather.summary,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  getLocations() {
    axios.get('http://localhost:3000/locations')
      .then((response) => {
        this.setState({
          locations: response.data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveLocation(location) {
    axios.post(`http://localhost:3000/locations?location=${location}`)
      .then(() => {
        this.getLocations();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  deleteLocation(location) {
    axios.delete(`http://localhost:3000/locations?location=${location}`)
      .then(() => {
        this.getLocations();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const {
      currentLocation, temperature, summary, locations,
    } = this.state;

    const mainColumnClasses = `column ${!locations.length ? 'is-full' : 'is-two-thirds'}`;

    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className={mainColumnClasses}>
              <h1 className="title is-1">Simple Weather</h1>
              <Search getWeather={this.getWeather} />
              <Weather
                location={currentLocation}
                temperature={Math.round(temperature)}
                summary={summary}
                saveLocation={this.saveLocation}
                isSaved={locations.includes(currentLocation)}
              />
            </div>
            <div className="column">
              <Locations
                locations={locations}
                getWeather={this.getWeather}
                deleteLocation={this.deleteLocation}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
