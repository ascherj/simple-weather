import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search';
import Weather from './components/Weather';
import Locations from './components/Locations';
import Location from './components/Location';

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

  render() {
    const {
      currentLocation, temperature, summary, locations,
    } = this.state;

    return (
      <div className="section">
        <div className="container">
          <div className="columns">
            {/* <div className="column" /> */}
            <div className="column is-two-thirds">
              <h1 className="title is-1">Simple Weather</h1>
              <Search getWeather={this.getWeather} />
              <Weather
                location={currentLocation}
                temperature={Math.round(temperature)}
                summary={summary}
                saveLocation={this.saveLocation}
              />
            </div>
            <div className="column">
              <Locations locations={locations} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
