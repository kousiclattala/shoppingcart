import React, {useCallback, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  Pressable,
  Platform,
  TouchableOpacity,
} from 'react-native';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {
  bottomStackProp,
  stackNavigationProp,
} from '../../types/NavigationTypes';
import {ProductProps} from '../../types/Types';
import {fetchGET} from '../../services/ApiService';
import {getAllProducts} from '../../services/ApiEndpoints';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  increaseCartCount,
  increaseQuantityCount,
  removeFavouriteItem,
  updateCartItems,
  updateFavouriteItems,
} from '../../redux/authSlice';
import HomeHeader from '../home/HomeHeader';
import CustomStatusBar from '../../components/CustomStatusBar';

const Favourites = () => {
  const navigation = useNavigation<bottomStackProp>();
  const dispatch = useAppDispatch();

  const {favouriteItems, cartItems} = useAppSelector(state => state.auth);

  const [refresh, setRefresh] = useState(false);

  const _removeFromFavourites = (item: ProductProps, index: number) => {
    dispatch(removeFavouriteItem(item.id));
  };

  const _addToCart = (item: ProductProps, index: number) => {
    if (cartItems.length > 0) {
      cartItems.map((it: ProductProps, indx: number) => {
        if (it.id == item.id) {
          dispatch(increaseQuantityCount(item.id));
        } else {
          let _item = item;
          _item.quantity = 1;

          dispatch(updateCartItems(_item));
          dispatch(increaseCartCount(1));
          dispatch(removeFavouriteItem(item.id));
        }
      });
    } else {
      let _item = item;
      _item.quantity = 1;

      dispatch(updateCartItems(_item));
      dispatch(increaseCartCount(1));
      dispatch(removeFavouriteItem(item.id));
    }
  };

  const _renderItem = (item: ProductProps, index: number) => {
    return (
      <Pressable
        style={{
          width: wp('42%'),
          height: hp('25%'),
          backgroundColor: resources.colors.black1,
          borderRadius: 10,
          marginLeft: wp('5%'),
          marginBottom: hp('2%'),
        }}
        onPress={() => {
          navigation.navigate('ProductDetail', {
            id: item.id,
          });
        }}>
        <View
          style={{
            width: wp('42%'),
            height: hp('15%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{uri: item.thumbnail}}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'center',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              overflow: 'hidden',
            }}
          />
          <TouchableOpacity
            style={[
              {
                width: 30,
                height: 30,
                backgroundColor: resources.colors.white,
                borderRadius: 100,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'absolute',
                top: 10,
                left: 10,
              },
              Platform.OS == 'ios'
                ? resources.styles.iosShadow
                : resources.styles.androidShadow,
            ]}
            onPress={() => {
              _removeFromFavourites(item, index);
            }}>
            <IonIcon name={'heart'} size={20} color={resources.colors.red} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: wp('32%'),
              height: hp('10%'),
              justifyContent: 'center',
              alignItems: 'flex-start',
              paddingStart: wp('3%'),
            }}>
            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('3.5%'),
                fontFamily: resources.fonts.manropeBold,
                fontWeight: '700',
                letterSpacing: 0.6,
              }}>
              ${item.price}
            </Text>
            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('3%'),
                fontFamily: resources.fonts.manropeLight,
                fontWeight: '400',
                letterSpacing: 0.6,
                marginTop: hp('0.5%'),
              }}>
              {item.title}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              width: wp('10%'),
              height: hp('10%'),
              justifyContent: 'center',
              alignItems: 'flex-start',
            }}
            onPress={() => _addToCart(item, index)}>
            <IonIcon
              name="add-circle"
              size={30}
              color={resources.colors.blue_dark}
            />
          </TouchableOpacity>
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: resources.colors.white,
      }}>
      <CustomStatusBar />

      <View
        style={{
          backgroundColor: resources.colors.blue_secondary,
          width: wp('100%'),
          height: hp('8%'),
        }}>
        <HomeHeader title="Favourites" />
      </View>

      {favouriteItems.length == 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={resources.images.heart}
            style={{
              width: 100,
              height: 100,
              resizeMode: 'contain',
              tintColor: resources.colors.black10,
            }}
          />
          <Text
            style={{
              color: resources.colors.black45,
              fontSize: wp('4%'),
              fontFamily: resources.fonts.manropeExtraBold,
              fontWeight: 'bold',
              letterSpacing: 0.6,
              marginTop: hp('3%'),
            }}>
            You haven't added any favourites
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
              Add Favourites
            </Text>
          </Pressable>
        </View>
      ) : (
        <View>
          <FlatList
            data={favouriteItems}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item, index}) => _renderItem(item, index)}
            numColumns={2}
            style={{
              marginTop: hp('3%'),
            }}
            refreshing={refresh}
          />
        </View>
      )}
    </View>
  );
};

export default Favourites;
