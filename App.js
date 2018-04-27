import React, { Component, Text, View } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import Main from './src/Main';
import configureStore from './src/configureStore';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      pAndS: configureStore()
    };
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      );
    }
    return (
      <Provider store={this.state.pAndS.store}>
        <PersistGate persistor={this.state.pAndS.persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}
