import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    $.ajax({
      url: '/items',
      success: (data) => {
        this.setState({
          items: data,
        });
      },
      error: (err) => {
        console.log('err', err);
      },
    });
  }

  render() {
    return (
      <div>
        <h1>Simple Weather</h1>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
