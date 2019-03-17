import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: undefined,
      lng: undefined,
      temperature: undefined,
    };

    this.getWeather = this.getWeather.bind(this);
  }

  componentDidMount() {

  }

  getWeather(location) {
    axios.get('http://localhost:3000/weather', {
      params: { location },
    })
      .then((response) => {
        console.log(response);
        this.setState({});
      })
      .catch((err) => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="section">
        <h1 className="title">Simple Weather</h1>
        <Search getWeather={this.getWeather} />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
