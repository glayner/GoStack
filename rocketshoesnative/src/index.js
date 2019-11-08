import React, {Component} from 'react';
import {StatusBar} from 'react-native';
import './config/ReactotronConfig';

import {Provider} from 'react-redux';

import Routes from './routes';
import * as NavigationService from './services/NavigationService';

import store from './store';

class App extends Component {
  componentDidMount() {
    NavigationService.setNavigator(this.navigator);
  }

  render() {
    return (
      <Provider store={store}>
        <StatusBar barStyle="light-content" backgroundColor="#141419" />
        <Routes
          ref={nav => {
            this.navigator = nav;
          }}
        />
      </Provider>
    );
  }
}

export default App;
