import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search';
import Weather from './components/Weather';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: '',
      temperature: undefined,
    };
    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {

  }

  getWeather(location) {
    axios.get(`http://localhost:3000/weather?location=${location}`)
      .then((response) => {
        console.log(response);
        this.setState({
          location: response.data.formattedAddress,
          temperature: response.data.currentWeather.temperature,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    const { location, temperature } = this.state;

    return (
      <div className="section">
        <h1 className="title">Simple Weather</h1>
        <Search getWeather={this.getWeather} />
        <Weather location={location} temperature={temperature} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
