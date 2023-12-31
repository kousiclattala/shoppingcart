import React from 'react';
import {View, Text, ScrollView, StatusBar, NativeModules} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import BottomNavigator from './src/navigators/BottomNavigator';
import resources from './src/resources';
import StackNavigator from './src/navigators/StackNavigator';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
