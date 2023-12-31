import React from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import resources from '../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LoaderComponent = () => {
  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('30%'),
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={resources.colors.black100} />
    </View>
  );
};

export default LoaderComponent;
