import {View, Text, ScrollView, Image, FlatList} from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../../resources';

const HomeBanners = () => {
  const _renderItem = (item: any, index: number) => {
    return (
      <View
        style={{
          width: wp('75%'),
          height: hp('16%'),
          backgroundColor: `rgba(249, 176, 35, 0.${index + 8})`,
          borderRadius: 20,
          marginRight: wp('5%'),
          flexDirection: 'row',
        }}
        key={index}>
        <View
          style={{
            width: wp('35%'),
            height: hp('16%'),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={resources.images.empty_icon}
            style={{
              width: 70,
              height: 70,
              resizeMode: 'contain',
              tintColor: resources.colors.black1,
            }}
          />
        </View>
        <View
          style={{
            width: wp('35%'),
            height: hp('16%'),
            justifyContent: 'center',
            alignItems: 'flex-start',
          }}>
          <Text
            style={{
              color: resources.colors.black1,
              fontSize: wp('5%'),
              fontFamily: resources.fonts.manropeLight,
              fontWeight: '400',
              letterSpacing: 0.6,
            }}>
            Get
          </Text>
          <Text
            style={{
              color: resources.colors.black1,
              fontSize: wp('7%'),
              fontFamily: resources.fonts.manropeBold,
              fontWeight: '800',
              letterSpacing: 0.6,
            }}>
            50% OFF
          </Text>
          <Text
            style={{
              color: resources.colors.black1,
              fontSize: wp('3.5%'),
              fontFamily: resources.fonts.manropeLight,
              fontWeight: '400',
              letterSpacing: 0.6,
            }}>
            On first 03 order
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        width: wp('100%'),
        height: hp('20%'),
        marginTop: hp('2%'),
      }}>
      <FlatList
        data={[1, 2, 3]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => _renderItem(item, index)}
        horizontal
        contentContainerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingStart: wp('4%'),
        }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeBanners;
