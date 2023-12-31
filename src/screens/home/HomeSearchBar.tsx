import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../../resources';
import IonIcon from 'react-native-vector-icons/Ionicons';

const HomeSearchBar = () => {
  return (
    <View
      style={{
        width: wp('90%'),
        height: hp('7%'),
        marginHorizontal: wp('5%'),
        borderRadius: 50,
        marginTop: hp('1%'),
        flexDirection: 'row',
        backgroundColor: resources.colors.blue_dark,
      }}>
      <View
        style={{
          width: wp('15%'),
          height: hp('7%'),
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <IonIcon
          name="search-outline"
          size={20}
          color={resources.colors.white}
        />
      </View>
      <View
        style={{
          width: wp('75%'),
          height: hp('7%'),
          borderTopRightRadius: 50,
          borderBottomRightRadius: 50,
        }}>
        <TextInput
          placeholder="Search Products or Store"
          placeholderTextColor={resources.colors.black20}
          style={{
            width: wp('70%'),
            height: hp('7%'),
            color: resources.colors.black1,
            fontSize: wp('3%'),
            fontFamily: resources.fonts.manropeRegular,
            letterSpacing: 0.6,
            fontWeight: '400',
          }}
        />
      </View>
    </View>
  );
};

export default HomeSearchBar;
