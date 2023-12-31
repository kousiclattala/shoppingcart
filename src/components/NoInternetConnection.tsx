import React from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ErrorComponentProps} from '../types/Types';

const NoInternetConnection = () => {
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: resources.colors.red,
          fontSize: wp('4%'),
          fontFamily: resources.fonts.manropeMedium,
          fontWeight: '400',
          letterSpacing: 0.6,
        }}>
        No Internet Connection
      </Text>
    </View>
  );
};

export default NoInternetConnection;
