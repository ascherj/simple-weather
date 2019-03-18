import React, { Component } from 'react';

export default class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      location: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleInputChange(event) {
    console.log(event.target.value);
    this.setState({
      location: event.target.value,
    });
  }

  handleKeyPress(event) {
    const { getWeather } = this.props;
    const { location } = this.state;

    if (event.key === 'Enter') {
      getWeather(location);
    }
  }

  render() {
    const { getWeather } = this.props;
    const { location } = this.state;

    return (
      <div className="search">
        <input className="input" type="text" placeholder="City, state, zip code..." onChange={this.handleInputChange} onKeyPress={this.handleKeyPress} />
        <button className="button is-dark" type="button" onClick={() => getWeather(location)}>Submit</button>
      </div>
    );
  }
}
