
import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Header } from './components/common';
import reducers from './reducers';
import LibraryList from './components/LibraryList';


class App extends Component {

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View style={{ flex: 1 }}>
          <Header headerText="TechStack" />
          <LibraryList />
        </View>
      </Provider>
    );
  }

  
}

export default App;
