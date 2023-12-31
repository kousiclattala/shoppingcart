import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {View, Text} from 'react-native';
import Home from '../screens/home/Home';
import CartScreen from '../screens/cart/CartScreen';
import {StackNavigationList} from '../types/NavigationTypes';
import BottomNavigator from './BottomNavigator';
import ProductDetail from '../screens/product/ProductDetail';

const Stack = createStackNavigator<StackNavigationList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="HomeScreen" component={BottomNavigator} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
