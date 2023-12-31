import {
  View,
  Text,
  ScrollView,
  Image,
  Platform,
  TouchableOpacity,
  NativeSyntheticEvent,
  NativeScrollEvent,
  ImageBackground,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import resources from '../../resources';
import SubHeader from '../../components/SubHeader';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {
  ProductDetailsRouteProp,
  bottomStackProp,
  productDetailScreenRouteProps,
} from '../../types/NavigationTypes';
import {useAppDispatch, useAppSelector} from '../../redux/hooks';
import {
  increaseCartCount,
  increaseQuantityCount,
  setBackgroundColor,
  setBarStyle,
  setProduct,
  updateCartItems,
  updateFavouriteItems,
  updateProduct,
} from '../../redux/authSlice';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {fetchGET} from '../../services/ApiService';
import {getAllProducts} from '../../services/ApiEndpoints';
import {Rating} from 'react-native-ratings';
import LoaderComponent from '../../components/LoaderComponent';
import ErrorComponent from '../../components/ErrorComponent';
import {useNetInfo} from '@react-native-community/netinfo';
import NoInternetConnection from '../../components/NoInternetConnection';
import NoDataComponent from '../../components/NoDataComponent';

const ProductDetail = () => {
  const navigation = useNavigation<bottomStackProp>();
  const dispatch = useAppDispatch();
  const route = useRoute<productDetailScreenRouteProps>();
  const {id} = route.params;

  const netInfo = useNetInfo();

  const {product, cartItems} = useAppSelector(state => state.auth);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useFocusEffect(
    useCallback(() => {
      _getProductDetail();

      dispatch(setBackgroundColor(resources.colors.white));
      dispatch(setBarStyle('dark-content'));
    }, []),
  );

  const _onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let _currentIndex =
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width;

    setCurrentIndex(_currentIndex);
  };

  const _getProductDetail = async () => {
    try {
      setIsLoading(true);
      setIsError(false);
      const res = await fetchGET(`${getAllProducts}/${id}`);

      // console.log('res from get product detail ==>', res);

      Object.assign(res, {
        isAddedToCart: false,
        isAddedToFavourite: false,
        quantity: 1,
      });

      dispatch(setProduct(res));
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      setIsError(true);
      console.log('error from get product details ==>', error);
    }
  };

  const _onFavouritePress = () => {
    const _product = product;

    _product.isAddedToFavourite = true;
    dispatch(updateProduct(true));
    dispatch(updateFavouriteItems(_product));
  };

  const _onCartPress = () => {
    const _product = product;

    _product.isAddedToCart = true;
    _product.quantity = 1;
    dispatch(setProduct(_product));
    dispatch(updateCartItems(_product));
    dispatch(increaseCartCount(1));
  };

  const _onBuyCartPress = () => {
    const _product = product;

    if (_product !== undefined) {
      dispatch(updateCartItems(_product));
      dispatch(increaseCartCount(1));
      dispatch(setProduct(_product));
      navigation.navigate('Cart');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: resources.colors.white,
      }}>
      <SubHeader
        title=""
        isScrolled={false}
        onPress={() => {
          navigation.navigate('Home');
        }}
        onCartPress={() => {
          navigation.navigate('Cart');
        }}
      />

      {!netInfo.isConnected ? (
        <NoInternetConnection />
      ) : isLoading ? (
        <LoaderComponent />
      ) : isError ? (
        <ErrorComponent onPress={_getProductDetail} />
      ) : product.id == 0 ? (
        <NoDataComponent />
      ) : (
        <ScrollView>
          {/* product title */}
          <View
            style={{
              marginLeft: wp('6%'),
              marginTop: hp('3%'),
            }}>
            <Text
              style={{
                color: resources.colors.black,
                fontSize: wp('10%'),
                fontFamily: resources.fonts.manropeLight,
                fontWeight: '400',
                letterSpacing: 0.6,
              }}>
              {product?.brand}
            </Text>
            <Text
              style={{
                color: resources.colors.black,
                fontSize: wp('10%'),
                fontFamily: resources.fonts.manropeBold,
                fontWeight: '800',
                letterSpacing: 0.6,
              }}>
              {product?.title}
            </Text>
          </View>

          {/* reviews and ratings */}

          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp('1%'),
              marginLeft: wp('5%'),
            }}>
            <View>
              <Rating
                imageSize={15}
                readonly
                startingValue={product.rating}
                style={{
                  marginRight: wp('2%'),
                }}
              />
            </View>

            <Text
              style={{
                color: resources.colors.black100,
                fontFamily: resources.fonts.manropeLight,
                fontWeight: '300',
                fontSize: wp('3%'),
                letterSpacing: 0.6,
              }}>
              {product.rating}
            </Text>
          </View>

          {/* image container */}
          <View>
            <View
              style={{
                width: wp('100%'),
                height: hp('26%'),
                backgroundColor: resources.colors.black1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ScrollView
                horizontal
                nestedScrollEnabled
                pagingEnabled
                onScroll={_onScroll}
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}>
                {product?.images.map((img: string, index: number) => (
                  <View
                    style={{
                      width: wp('100%'),
                      height: hp('26%'),
                      backgroundColor: resources.colors.black1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    key={index}>
                    <Image
                      source={{uri: img}}
                      style={{
                        width: 400,
                        // height: 200,
                        resizeMode: 'cover',
                        aspectRatio: 2,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  </View>
                ))}
              </ScrollView>
            </View>

            <TouchableOpacity
              style={[
                {
                  width: 50,
                  height: 50,
                  borderRadius: 15,
                  backgroundColor: resources.colors.white,
                  justifyContent: 'center',
                  alignItems: 'center',
                  position: 'absolute',
                  right: 20,
                  top: 15,
                },
                Platform.OS == 'ios'
                  ? resources.styles.iosShadow
                  : resources.styles.androidShadow,
              ]}
              onPress={_onFavouritePress}>
              {product.isAddedToFavourite ? (
                <IonIcon
                  name={'heart'}
                  size={20}
                  color={resources.colors.red}
                />
              ) : (
                <IonIcon
                  name={'heart-outline'}
                  size={20}
                  color={resources.colors.black}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                width: wp('50%'),
                height: hp('5%'),
                position: 'absolute',
                bottom: 0,
                justifyContent: 'flex-start',
                alignItems: 'center',
                flexDirection: 'row',
                paddingStart: wp('5%'),
              }}>
              {product?.images.map((it: any, index: number) => (
                <View
                  style={{
                    width: 30,
                    height: 5,
                    borderRadius: 50,
                    backgroundColor:
                      Number(currentIndex.toFixed(0)) == index
                        ? resources.colors.yellow
                        : resources.colors.black20,
                    marginRight: wp('3%'),
                  }}
                  key={index}
                />
              ))}
            </View>
          </View>

          {/* price container */}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp('2%'),
              paddingStart: wp('5%'),
              width: wp('100%'),
            }}>
            <Text
              style={{
                color: resources.colors.blue_secondary,
                fontSize: wp('4%'),
                fontFamily: resources.fonts.maropeSemiBold,
                fontWeight: '700',
                letterSpacing: 0.6,
              }}>
              ${product?.price}
              {/* <Text
              style={{
                fontFamily: resources.fonts.manropeLight,
                fontWeight: '400',
              }}>
              /KG
            </Text> */}
            </Text>
            <View
              style={{
                width: 100,
                height: 25,
                backgroundColor: resources.colors.blue_secondary,
                marginLeft: wp('3%'),
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  color: resources.colors.white,
                  fontSize: wp('3%'),
                  fontFamily: resources.fonts.manropeLight,
                  fontWeight: '400',
                  letterSpacing: 0.6,
                }}>
                {product?.discountPercentage} % OFF
              </Text>
            </View>
          </View>

          {/* buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginVertical: hp('2%'),
              justifyContent: 'space-between',
              alignItems: 'center',
              marginHorizontal: wp('5%'),
            }}>
            <TouchableOpacity
              style={{
                width: wp('42%'),
                height: hp('7%'),
                borderRadius: 20,
                borderWidth: 1,
                borderColor: resources.colors.blue_secondary,
                backgroundColor: resources.colors.white,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={_onCartPress}
              disabled={product.isAddedToCart}>
              <Text
                style={{
                  color: resources.colors.blue_secondary,
                  fontSize: wp('4%'),
                  fontFamily: resources.fonts.maropeSemiBold,
                  fontWeight: '500',
                }}>
                {product.isAddedToCart ? 'Added To Cart' : 'Add To Cart'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: wp('42%'),
                height: hp('7%'),
                borderRadius: 20,
                backgroundColor: resources.colors.blue_secondary,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={_onBuyCartPress}>
              <Text
                style={{
                  color: resources.colors.white,
                  fontSize: wp('4%'),
                  fontFamily: resources.fonts.maropeSemiBold,
                  fontWeight: '500',
                }}>
                Buy Now
              </Text>
            </TouchableOpacity>
          </View>

          {/* details */}
          <View
            style={{
              marginTop: hp('2%'),
              marginHorizontal: wp('5%'),
            }}>
            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('4%'),
                fontFamily: resources.fonts.maropeSemiBold,
                fontWeight: Platform.OS == 'ios' ? '600' : '400',
                letterSpacing: 0.6,
              }}>
              Details
            </Text>
            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('4%'),
                fontFamily: resources.fonts.manropeLight,
                fontWeight: '200',
                letterSpacing: 0.6,
                lineHeight: 24,
                marginTop: hp('2%'),
              }}>
              {product?.description}
            </Text>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ProductDetail;
