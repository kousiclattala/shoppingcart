import React from 'react';
import {View, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../../resources';
import IonIcon from 'react-native-vector-icons/Ionicons';

const HomeAddress = () => {
  return (
    <View
      style={{
        width: wp('90%'),
        height: hp('10%'),
        marginHorizontal: wp('5%'),
        marginTop: hp('1%'),
        flexDirection: 'row',
      }}>
      <View
        style={{
          width: wp('60%'),
          height: hp('10%'),
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <Text
          style={{
            color: resources.colors.black45,
            fontSize: wp('3.5%'),
            fontFamily: resources.fonts.manropeRegular,
            fontWeight: '800',
            letterSpacing: 0.6,
            opacity: 0.5,
          }}>
          DELIVERY TO
        </Text>
        <Text
          style={{
            color: resources.colors.white,
            fontSize: wp('3.5%'),
            fontFamily: resources.fonts.manropeRegular,
            fontWeight: '500',
            letterSpacing: 0.6,
            marginTop: hp('0.5%'),
          }}>
          Green Way 3000, Sylhet{'  '}
          <IonIcon
            name="chevron-down"
            size={15}
            color={resources.colors.black45}
          />
        </Text>
      </View>
      <View
        style={{
          width: wp('30%'),
          height: hp('10%'),
          alignItems: 'flex-end',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            color: resources.colors.black45,
            fontSize: wp('3.5%'),
            fontFamily: resources.fonts.manropeRegular,
            fontWeight: '800',
            letterSpacing: 0.6,
            opacity: 0.5,
            right: 10,
          }}>
          WITHIN
        </Text>
        <Text
          style={{
            color: resources.colors.white,
            fontSize: wp('3.5%'),
            fontFamily: resources.fonts.manropeRegular,
            fontWeight: '500',
            letterSpacing: 0.6,
            marginTop: hp('0.5%'),
          }}>
          1 Hour{'  '}
          <IonIcon
            name="chevron-down"
            size={12}
            color={resources.colors.black45}
          />
        </Text>
      </View>
    </View>
  );
};

export default HomeAddress;
