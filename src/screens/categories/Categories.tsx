import React from 'react';
import {View, Text, FlatList} from 'react-native';
import resources from '../../resources';
import CustomStatusBar from '../../components/CustomStatusBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../home/HomeHeader';
import {useAppSelector} from '../../redux/hooks';

const Categories = () => {
  const {categories} = useAppSelector(state => state.auth);

  const _renderItem = (item: any, index: number) => {
    return (
      <View
        style={{
          width: wp('45%'),
          height: hp('20%'),
          borderRadius: 20,
          backgroundColor: resources.colors.black1,
          marginHorizontal: wp('2.5%'),
          marginBottom: hp('2%'),
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: resources.colors.black100,
            fontSize: wp('4%'),
            fontFamily: resources.fonts.maropeSemiBold,
            // fontWeight: '600',
            letterSpacing: 0.6,
            textTransform: 'capitalize',
          }}>
          {item}
        </Text>
      </View>
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
        <HomeHeader title="Categories" />
      </View>

      <View
        style={{
          marginTop: hp('3%'),
        }}>
        <FlatList
          data={categories}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => _renderItem(item, index)}
          numColumns={2}
        />
      </View>
    </View>
  );
};

export default Categories;
