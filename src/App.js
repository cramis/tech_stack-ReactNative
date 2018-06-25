
import React, { Component } from 'react';
import { View } from 'react-native';
import { Header, Button, Spinner, CardSection, Card } from './components/common';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';


class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Header headerText="techStack" />
        </View>
      </Provider>
    );
  }

  
}

export default App;
