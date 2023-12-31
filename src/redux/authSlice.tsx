import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import {AuthSliceState} from '../types/ReduxTypes';
import resources from '../resources';
import {StatusBarStyle} from 'react-native';
import {ProductProps} from '../types/Types';

const initialState: AuthSliceState = {
  translucent: true,
  backgroundColor: resources.colors.blue_secondary,
  barStyle: 'default',
  cartItems: [],
  favouriteItems: [],
  totalCartItems: 0,
  product: {
    id: 0,
    brand: '',
    category: '',
    description: '',
    discountPercentage: 0,
    images: [],
    isAddedToCart: false,
    isAddedToFavourite: false,
    price: 0,
    rating: 0,
    stock: 0,
    thumbnail: '',
    title: '',
    quantity: 0,
  },
  categories: [],
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setTranslucent: (state, action: PayloadAction<boolean>) => {
      state.translucent = action.payload;
    },
    setBackgroundColor: (state, action: PayloadAction<string>) => {
      state.backgroundColor = action.payload;
    },
    setBarStyle: (state, action: PayloadAction<StatusBarStyle>) => {
      state.barStyle = action.payload;
    },
    setCartItems: (state, action: PayloadAction<ProductProps[]>) => {
      state.cartItems = action.payload;
    },
    updateCartItems: (state, action: PayloadAction<ProductProps>) => {
      state.cartItems.push(action.payload);
    },
    updateFavouriteItems: (state, action: PayloadAction<ProductProps>) => {
      state.favouriteItems.push(action.payload);
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.filter(
        (item: ProductProps) => item.id !== action.payload,
      );
    },
    removeFavouriteItem: (state, action: PayloadAction<number>) => {
      state.favouriteItems = state.favouriteItems.filter(
        (item: ProductProps) => item.id !== action.payload,
      );
    },
    increaseCartCount: (state, action: PayloadAction<number>) => {
      state.totalCartItems = state.cartItems.length;
    },
    decreaseCartCount: (state, action: PayloadAction<number>) => {
      state.totalCartItems = state.cartItems.length;
    },
    increaseQuantityCount: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.map((item: ProductProps) => {
        if (item.id == action.payload) {
          item.quantity += 1;
        }

        return item;
      });
    },
    decreaseQuantityCount: (state, action: PayloadAction<number>) => {
      state.cartItems = state.cartItems.map((item: ProductProps) => {
        if (item.id == action.payload) {
          item.quantity -= 1;
        }

        return item;
      });
    },
    setProduct: (state, action: PayloadAction<ProductProps>) => {
      state.product = action.payload;
    },
    updateProduct: (state, action: PayloadAction<boolean>) => {
      state.product.isAddedToFavourite = action.payload;
    },
    setCategories: (state, action: PayloadAction<any[]>) => {
      state.categories = action.payload;
    },
  },
});

export const {
  setBackgroundColor,
  setTranslucent,
  setBarStyle,
  setCartItems,
  updateCartItems,
  updateFavouriteItems,
  increaseCartCount,
  decreaseCartCount,
  removeCartItem,
  removeFavouriteItem,
  increaseQuantityCount,
  decreaseQuantityCount,
  setProduct,
  updateProduct,
  setCategories,
} = authSlice.actions;

export default authSlice.reducer;
