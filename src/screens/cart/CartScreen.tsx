import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Image,
  Pressable,
} from 'react-native';
import resources from '../../resources';
import SubHeader from '../../components/SubHeader';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  decreaseCartCount,
  decreaseQuantityCount,
  increaseQuantityCount,
  removeCartItem,
  setBackgroundColor,
  setBarStyle,
  setCartItems,
} from '../../redux/authSlice';
import CartRenderer from './CartRenderer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {bottomStackProp} from '../../types/NavigationTypes';
import {ProductProps} from '../../types/Types';

const CartScreen = () => {
  const navigation = useNavigation<bottomStackProp>();
  const dispatch = useAppDispatch();
  const {cartItems, totalCartItems} = useAppSelector(state => state.auth);

  const DELIVERY = 100;

  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);

  useFocusEffect(
    useCallback(() => {
      _calculateAmount();

      dispatch(setBackgroundColor(resources.colors.white));
      dispatch(setBarStyle('dark-content'));
    }, [cartItems]),
  );

  const _calculateAmount = () => {
    let _subtotal: number = 0;
    let _total: number = 0;

    cartItems.forEach((item: ProductProps) => {
      _subtotal += item.price * item.quantity;
    });

    _total = _subtotal + DELIVERY;

    setSubtotal(_subtotal);
    setTotal(_total);
  };

  const onMinusPress = (item: ProductProps) => {
    dispatch(decreaseQuantityCount(item.id));
    _calculateAmount();
  };
  const onPlusPress = (item: ProductProps) => {
    dispatch(increaseQuantityCount(item.id));
    _calculateAmount();
  };

  const onDeletePress = (item: ProductProps) => {
    dispatch(removeCartItem(item.id));
    dispatch(decreaseCartCount(1));
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: resources.colors.white,
      }}>
      <SubHeader
        isScrolled={false}
        title="Shopping Cart"
        onPress={() => {
          navigation.navigate('Home');
        }}
        onCartPress={() => {}}
      />

      {cartItems.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={resources.images.emptyCart}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
            }}
          />
          <Text
            style={{
              color: resources.colors.black45,
              fontSize: wp('5%'),
              fontFamily: resources.fonts.manropeExtraBold,
              fontWeight: 'bold',
              letterSpacing: 0.6,
              marginTop: hp('3%'),
            }}>
            Uh no!, no items found
          </Text>

          <Pressable
            style={{
              width: wp('70%'),
              height: hp('7%'),
              borderRadius: 30,
              // borderWidth: 0.5,
              borderColor: resources.colors.blue_secondary,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: resources.colors.black1,
              marginTop: hp('5%'),
            }}
            onPress={() => {
              navigation.navigate('Home');
            }}>
            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('4%'),
                fontFamily: resources.fonts.manropeRegular,
                fontWeight: '400',
                letterSpacing: 0.6,
              }}>
              Add Items
            </Text>
          </Pressable>
        </View>
      ) : (
        <View
          style={{
            height: Platform.OS == 'ios' ? hp('42%') : hp('46%'),
            //   backgroundColor: 'red',
            marginTop: hp('4%'),
            paddingBottom: hp('2%'),
          }}>
          <FlatList
            data={cartItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => (
              <CartRenderer
                item={item}
                index={index}
                onMinusPress={onMinusPress}
                onPlusPress={onPlusPress}
                onDeletePress={onDeletePress}
              />
            )}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  width: wp('90%'),
                  height: hp('0.2%'),
                  marginHorizontal: wp('5%'),
                  backgroundColor: resources.colors.black1,
                  marginVertical: hp('2%'),
                }}
              />
            )}
          />
        </View>
      )}

      {cartItems.length > 0 && (
        <>
          <Text style={styles.editText}>Edit</Text>

          <View
            style={[
              styles.container,
              {
                marginTop: hp('3%'),
              },
            ]}>
            <View style={styles.itemContainer}>
              <Text style={styles.itemHeading}>Subtotal</Text>
              <Text style={styles.itemValue}>$ {subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemHeading}>Delivery</Text>
              <Text style={styles.itemValue}>$ {DELIVERY.toFixed(2)}</Text>
            </View>
            <View style={styles.itemContainer}>
              <Text style={styles.itemHeading}>Total</Text>
              <Text style={styles.itemValue}>$ {total.toFixed(2)}</Text>
            </View>

            <TouchableOpacity style={styles.btn}>
              <Text style={styles.btnText}>Proceed To checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  editText: {
    color: resources.colors.blue_secondary,
    fontSize: wp('4%'),
    fontFamily: resources.fonts.manropeMedium,
    fontWeight: '400',
    letterSpacing: 0.6,
    alignSelf: 'flex-end',
    marginRight: wp('5%'),
  },
  container: {
    width: wp('90%'),
    height: hp('33%'),
    marginHorizontal: wp('5%'),
    backgroundColor: resources.colors.black1,
    borderRadius: 30,
    paddingTop: hp('2%'),
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: wp('90%'),
    paddingHorizontal: wp('7%'),
    // backgroundColor: 'red',
    height: hp('5%'),
    marginTop: hp('1%'),
  },
  itemHeading: {
    color: resources.colors.black90,
    fontSize: wp('4.5%'),
    fontFamily: resources.fonts.manropeRegular,
    fontWeight: '400',
    letterSpacing: 0.6,
    opacity: 0.8,
  },
  itemValue: {
    color: resources.colors.black100,
    fontSize: wp('4.5%'),
    fontFamily: resources.fonts.manropeMedium,
    fontWeight: '700',
    letterSpacing: 0.6,
  },
  btn: {
    width: wp('80%'),
    height: hp('7%'),
    backgroundColor: resources.colors.blue_dark,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  btnText: {
    color: resources.colors.white,
    fontSize: wp('4%'),
    fontFamily: resources.fonts.maropeSemiBold,
    fontWeight: '500',
    letterSpacing: 0.6,
  },
});

export default CartScreen;
