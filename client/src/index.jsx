import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './components/Search';
import Weather from './components/Weather';
import Locations from './components/Locations';
import Skycon from './components/Skycon';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
      temperature: NaN,
      summary: '',
      locations: [],
      icon: '',
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
        console.log(response);
        this.setState({
          currentLocation: response.data.formattedAddress,
          temperature: response.data.currentWeather.temperature,
          summary: response.data.currentWeather.summary,
          icon: response.data.currentWeather.icon,
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
      currentLocation, temperature, summary, locations, icon,
    } = this.state;

    const mainColumnClasses = `column ${!locations.length ? 'is-full' : 'is-two-thirds'}`;

    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className={mainColumnClasses}>
              <h1 className="title is-1">Simple Weather</h1>
              <Skycon icon={icon} />
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
