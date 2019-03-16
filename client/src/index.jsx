import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search';

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
      <div className="section">
        <h1 className="title">Simple Weather</h1>
        <Search />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
