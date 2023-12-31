import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Home from '../screens/home/Home';
import Categories from '../screens/categories/Categories';
import Favourites from '../screens/favourites/Favourites';
import More from '../screens/more/More';
import BottomBar from '../components/BottomBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../resources';
import StackNavigator from './StackNavigator';
import {BottomTabBarList} from '../types/NavigationTypes';

const Bottom = createBottomTabNavigator<BottomTabBarList>();

const BottomNavigator = () => {
  return (
    <Bottom.Navigator
      initialRouteName="Home"
      tabBar={props => <BottomBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          borderTopRightRadius: 30,
          borderTopLeftRadius: 30,
        },
      }}>
      <Bottom.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
        }}
      />
      <Bottom.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarLabel: 'Categories',
        }}
      />
      <Bottom.Screen
        name="Favourites"
        component={Favourites}
        options={{
          tabBarLabel: 'Favourites',
        }}
      />
      <Bottom.Screen
        name="More"
        component={More}
        options={{
          tabBarLabel: 'More',
        }}
      />
    </Bottom.Navigator>
  );
};

export default BottomNavigator;
