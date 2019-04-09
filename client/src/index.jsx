import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import TempToggle from './components/TempToggle';
import Search from './components/Search';
import Weather from './components/Weather';
import Locations from './components/Locations';
import Skycon from './components/Skycon';
import PoweredBy from './components/PoweredBy';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocation: '',
      temperature: NaN,
      isFahrenheit: true,
      currentlySummary: '',
      hourlySummary: '',
      locations: [],
      icon: '',
    };
    this.getWeather = this.getWeather.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
    this.toggleTemp = this.toggleTemp.bind(this);
  }

  componentDidMount() {}

  getWeather(location) {
    const { isFahrenheit } = this.state;
    axios.get(`/weather?location=${location}`)
      .then((response) => {
        let temperature = response.data.currently.temperature;
        if (!isFahrenheit) {
          temperature = (temperature - 32) * (5 / 9);
        }
        this.setState({
          currentLocation: response.data.formattedAddress,
          temperature: temperature,
          currentlySummary: response.data.currently.summary,
          hourlySummary: response.data.hourly.summary,
          icon: response.data.currently.icon,
        }, () => {
          this.updateBackgroundColor();
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  saveLocation(location) {
    const { locations } = this.state;
    locations.push(location);
    this.setState({
      locations,
    });
  }

  deleteLocation(location) {
    const { locations } = this.state;
    const indexToDelete = locations.indexOf(location);
    locations.splice(indexToDelete, 1);
    this.setState({
      locations,
    });
  }

  updateBackgroundColor() {
    const { temperature, isFahrenheit } = this.state;
    const fahrenheit = isFahrenheit ? temperature : (temperature * (9 / 5)) + 32;
    let color;

    if (fahrenheit < 20) color = 'temp1';
    else if (fahrenheit < 30) color = 'temp2';
    else if (fahrenheit < 40) color = 'temp3';
    else if (fahrenheit < 50) color = 'temp4';
    else if (fahrenheit < 60) color = 'temp5';
    else if (fahrenheit < 70) color = 'temp6';
    else if (fahrenheit < 80) color = 'temp7';
    else if (fahrenheit < 90) color = 'temp8';
    else if (fahrenheit < 100) color = 'temp9';
    else color = 'temp10';

    document.body.className = color;
  }

  toggleTemp() {
    const { temperature, isFahrenheit } = this.state;
    let newTemp;
    if (isFahrenheit) {
      newTemp = (temperature - 32) * (5 / 9);
    } else {
      newTemp = (temperature * (9 / 5)) + 32;
    }
    this.setState({
      temperature: newTemp,
      isFahrenheit: !isFahrenheit,
    });
  }

  render() {
    const {
      currentLocation, temperature, isFahrenheit, currentlySummary, hourlySummary, locations, icon,
    } = this.state;

    const mainColumnClasses = `column ${!locations.length ? 'is-full' : 'is-two-thirds'}`;

    return (
      <div className="section">
        <div className="container">
          <TempToggle toggleTemp={this.toggleTemp} />
          <div className="columns">
            <div className={mainColumnClasses}>
              <h1 className="title is-1">Simple Weather</h1>
              <Skycon icon={icon} />
              <Search getWeather={this.getWeather} />
              <Weather
                location={currentLocation}
                temperature={Math.round(temperature)}
                isFahrenheit={isFahrenheit}
                currentlySummary={currentlySummary}
                hourlySummary={hourlySummary}
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
          <PoweredBy />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
