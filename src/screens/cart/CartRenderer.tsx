import React from 'react';
import {View, Text, Image, TouchableOpacity, Easing} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../../resources';
import {CartRenderProps} from '../../types/Types';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, {
  FadeInRight,
  LightSpeedOutLeft,
} from 'react-native-reanimated';

const CartRenderer: React.FC<CartRenderProps> = ({
  item,
  index,
  onMinusPress,
  onPlusPress,
  onDeletePress,
}) => {
  return (
    <Animated.View
      style={{
        flexDirection: 'row',
        width: wp('90%'),
        height: hp('8%'),
        marginHorizontal: wp('5%'),
        // backgroundColor: 'red',
      }}
      exiting={LightSpeedOutLeft}>
      <View
        style={{
          width: wp('10%'),
          justifyContent: 'center',
          alignItems: 'center',
          height: hp('8%'),
        }}>
        <Image
          source={{uri: item.thumbnail}}
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
          }}
        />
      </View>
      <View
        style={{
          width: wp('50%'),
          height: hp('8%'),
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingStart: wp('5%'),
        }}>
        <Text
          style={{
            color: resources.colors.black100,
            fontSize: wp('4%'),
            fontFamily: resources.fonts.maropeSemiBold,
            fontWeight: '400',
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            color: resources.colors.black100,
            fontSize: wp('4%'),
            fontFamily: resources.fonts.manropeMedium,
            fontWeight: '400',
          }}>
          $ {item.price}
        </Text>
      </View>
      <View
        style={{
          width: wp('30%'),
          height: hp('10%'),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: resources.colors.black1,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: wp('3%'),
          }}
          onPress={() => {
            item.quantity > 1 ? onMinusPress(item) : onDeletePress(item);
          }}>
          {item.quantity > 1 ? (
            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('6%'),
                fontFamily: resources.fonts.maropeSemiBold,
                fontWeight: '400',
              }}>
              -
            </Text>
          ) : (
            <MCIcon
              name="delete-outline"
              size={20}
              color={resources.colors.red}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            color: resources.colors.black100,
            fontSize: wp('4%'),
            fontFamily: resources.fonts.maropeSemiBold,
            fontWeight: '500',
            letterSpacing: 0.6,
          }}>
          {item.quantity}
        </Text>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 100,
            backgroundColor: resources.colors.black1,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: wp('3%'),
          }}
          onPress={() => {
            onPlusPress(item);
          }}>
          <Text
            style={{
              color: resources.colors.black100,
              fontSize: wp('6%'),
              fontFamily: resources.fonts.maropeSemiBold,
              fontWeight: '400',
            }}>
            +
          </Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default CartRenderer;
