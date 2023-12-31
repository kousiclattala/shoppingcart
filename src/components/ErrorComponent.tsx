import React from 'react';
import {View, Text, ActivityIndicator, Pressable} from 'react-native';
import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ErrorComponentProps} from '../types/Types';

const ErrorComponent: React.FC<ErrorComponentProps> = ({onPress}) => {
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
        Something went wrong
      </Text>
      <Pressable
        style={{
          width: wp('50%'),
          height: hp('7%'),
          backgroundColor: resources.colors.black1,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: hp('2%'),
        }}
        onPress={onPress}>
        <Text
          style={{
            color: resources.colors.black100,
            fontSize: wp('4%'),
            fontFamily: resources.fonts.manropeRegular,
            fontWeight: '400',
            letterSpacing: 0.6,
          }}>
          Reload
        </Text>
      </Pressable>
    </View>
  );
};

export default ErrorComponent;
