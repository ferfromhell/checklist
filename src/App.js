import React, { Component } from 'react';
import { Segment, Dimmer, Loader } from 'semantic-ui-react';
// import { Input, Menu, Segment } from 'semantic-ui-react'
// import logo from './logo.svg';
import './App.css';

import Tabs from './components/Tabs';
import MainSelect from './components/MainSelect';

class App extends Component {
  constructor() {
    super();
    this.state = { 
      isLoading: true,
      activeItem: 'bio' 
    }
  }

  componentDidMount() {
      this.setState({isLoading: false})
  }

  //handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  
  render() {
    const Loading =(
      <Segment>
        <Dimmer active>
          <Loader size='massive'>Loading</Loader>
        </Dimmer>
      </Segment>
    );
    const Content = (
      <Segment>
          <MainSelect/>
          <Tabs/>
        </Segment>
    )
    return (
      <div className="App">
        {this.state.isLoading ? Loading:Content}
      </div>
    );
  }
}

export default App;
