import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search';
import Weather from './components/Weather';
import LocationList from './components/LocationList';
import LocationListEntry from './components/LocationListEntry';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
      temperature: NaN,
      summary: '',
      locationList: [],
    };
    this.getWeather = this.getWeather.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
  }

  componentDidMount() {

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

  saveLocation(location) {
    const { locationList } = this.state;
    locationList.push(<LocationListEntry location={location} />);
    this.setState({
      locationList,
    });
  }

  render() {
    const {
      currentLocation, temperature, summary, locationList,
    } = this.state;

    return (
      <div className="container">
        <div className="columns">
          <div className="column is-two-thirds">
            <h1 className="title is-1">Simple Weather</h1>
            <Search getWeather={this.getWeather} />
            <Weather
              location={currentLocation}
              temperature={temperature}
              summary={summary}
              saveLocation={this.saveLocation}
            />
          </div>
          <div className="column">
            <LocationList locations={locationList} />
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
