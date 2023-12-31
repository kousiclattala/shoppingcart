import {StatusBarStyle} from 'react-native';
import {ProductProps} from './Types';

export type AuthSliceState = {
  translucent: boolean;
  backgroundColor: string;
  barStyle: StatusBarStyle;
  cartItems: ProductProps[];
  favouriteItems: ProductProps[];
  totalCartItems: number;
  product: ProductProps;
  categories: any[];
};
