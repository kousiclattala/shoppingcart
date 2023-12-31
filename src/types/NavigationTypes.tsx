import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type ProductDetailsRouteProp = {
  id: number;
};

export type StackNavigationList = {
  HomeScreen: undefined;
  Cart: undefined;
  ProductDetail: {
    id: number;
  };
};

export type BottomTabBarList = {
  Home: undefined;
  Categories: undefined;
  Favourites: undefined;
  More: undefined;
};

export type productDetailScreenRouteProps = RouteProp<
  StackNavigationList,
  'ProductDetail'
>;

export type stackNavigationProp = StackNavigationProp<StackNavigationList>;
export type bottomTabProp = BottomTabNavigationProp<BottomTabBarList>;

export type bottomStackProp = CompositeNavigationProp<
  stackNavigationProp,
  bottomTabProp
>;
