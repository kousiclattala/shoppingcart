import React, {useCallback, useEffect, useState} from 'react';
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
import {stackNavigationProp} from '../../types/NavigationTypes';
import {ProductProps} from '../../types/Types';
import {fetchGET} from '../../services/ApiService';
import {getAllProducts} from '../../services/ApiEndpoints';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  increaseCartCount,
  increaseQuantityCount,
  setCategories,
  updateCartItems,
  updateFavouriteItems,
} from '../../redux/authSlice';
import LoaderComponent from '../../components/LoaderComponent';
import ErrorComponent from '../../components/ErrorComponent';
import NoInternetConnection from '../../components/NoInternetConnection';
import {useNetInfo} from '@react-native-community/netinfo';
import NoDataComponent from '../../components/NoDataComponent';

const HomeRecommended = () => {
  const navigation = useNavigation<stackNavigationProp>();
  const dispatch = useAppDispatch();

  const netInfo = useNetInfo();

  const [allProducts, setAllProducts] = useState<ProductProps[]>([]);

  const {cartItems} = useAppSelector(state => state.auth);

  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    _getAllProducts();
  }, []);

  const _getAllProducts = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      let _data: ProductProps[] = [];
      let uniqueCategories = new Set();

      const res = await fetchGET(getAllProducts);

      res.products.forEach((item: ProductProps) => {
        Object.assign(item, {
          isAddedToCart: false,
          isAddedToFavourite: false,
          quantity: 1,
        });

        _data.push(item);

        uniqueCategories.add(item.category);
      });

      let uniqueCategoriesArray = Array.from(uniqueCategories);

      setAllProducts(_data);
      dispatch(setCategories(uniqueCategoriesArray));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log('error in getting all products ==>', error);
    }
  };

  const _onFavouritePress = (item: ProductProps, index: number) => {
    let _item = item;
    _item.isAddedToFavourite = true;

    let _allProducts = allProducts;
    _allProducts[index].isAddedToFavourite = true;

    setAllProducts(_allProducts);
    setRefresh(!refresh);

    dispatch(updateFavouriteItems(_item));
  };

  const _onAddToCartPress = (item: ProductProps, index: number) => {
    let _item = item;
    _item.isAddedToCart = true;

    let _allProducts = allProducts;
    _allProducts[index].isAddedToCart = true;

    setAllProducts(_allProducts);
    setRefresh(!refresh);

    dispatch(updateCartItems(_item));
    dispatch(increaseCartCount(1));
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
              _onFavouritePress(item, index);
            }}>
            <IonIcon
              name={item.isAddedToFavourite ? 'heart' : 'heart-outline'}
              size={20}
              color={
                item.isAddedToFavourite
                  ? resources.colors.red
                  : resources.colors.black
              }
            />
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
          {!item.isAddedToCart && (
            <TouchableOpacity
              style={{
                width: wp('10%'),
                height: hp('10%'),
                justifyContent: 'center',
                alignItems: 'flex-start',
              }}
              onPress={() => {
                _onAddToCartPress(item, index);
              }}>
              <IonIcon
                name="add-circle"
                size={30}
                color={resources.colors.blue_dark}
              />
            </TouchableOpacity>
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View>
      <Text
        style={{
          color: resources.colors.black100,
          fontSize: wp('5%'),
          fontFamily: resources.fonts.manropeBold,
          fontWeight: '500',
          letterSpacing: 0.6,
          marginLeft: wp('5%'),
          marginTop: hp('2%'),
        }}>
        Recommended
      </Text>

      {!netInfo.isConnected ? (
        <NoInternetConnection />
      ) : isLoading ? (
        <LoaderComponent />
      ) : isError ? (
        <ErrorComponent onPress={_getAllProducts} />
      ) : (
        <FlatList
          data={allProducts}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => _renderItem(item, index)}
          numColumns={2}
          style={{
            marginTop: hp('3%'),
          }}
          refreshing={refresh}
          ListEmptyComponent={<NoDataComponent />}
        />
      )}
    </View>
  );
};

export default HomeRecommended;
