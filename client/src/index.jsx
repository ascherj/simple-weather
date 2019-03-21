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
      currentlySummary: '',
      hourlySummary: '',
      locations: [],
      icon: '',
    };
    this.getWeather = this.getWeather.bind(this);
    this.saveLocation = this.saveLocation.bind(this);
    this.deleteLocation = this.deleteLocation.bind(this);
    this.updateBackgroundColor = this.updateBackgroundColor.bind(this);
  }

  componentDidMount() {}

  getWeather(location) {
    axios.get(`https://young-earth-72309.herokuapp.com/weather?location=${location}`)
      .then((response) => {
        console.log(response);
        this.setState({
          currentLocation: response.data.formattedAddress,
          temperature: response.data.currently.temperature,
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
    const { temperature } = this.state;
    let color;

    if (temperature < 20) color = 'temp1';
    else if (temperature < 30) color = 'temp2';
    else if (temperature < 40) color = 'temp3';
    else if (temperature < 50) color = 'temp4';
    else if (temperature < 60) color = 'temp5';
    else if (temperature < 70) color = 'temp6';
    else if (temperature < 80) color = 'temp7';
    else if (temperature < 90) color = 'temp8';
    else if (temperature < 100) color = 'temp9';
    else color = 'temp10';

    document.body.className = color;
  }

  render() {
    const {
      currentLocation, temperature, currentlySummary, hourlySummary, locations, icon,
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
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
