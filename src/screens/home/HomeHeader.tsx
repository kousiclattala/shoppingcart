import React from 'react';
import {View, Text, Image, Platform, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../../resources';
import {useNavigation} from '@react-navigation/native';
import {stackNavigationProp} from '../../types/NavigationTypes';
import {useAppSelector} from '../../redux/hooks';
import {HomeHeaderProps} from '../../types/Types';

const HomeHeader: React.FC<HomeHeaderProps> = ({title}) => {
  const navigation = useNavigation<stackNavigationProp>();
  const {totalCartItems} = useAppSelector(state => state.auth);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: wp('5%'),
        marginTop: hp('2%'),
      }}>
      <Text
        style={{
          color: resources.colors.white,
          fontSize: wp('4%'),
          fontFamily: resources.fonts.manropeBold,
          fontWeight: '600',
        }}>
        {title}
      </Text>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <View
          style={{
            width: 20,
            height: 20,
            borderRadius: 100,
            backgroundColor: resources.colors.yellow_light,
            position: 'absolute',
            left: 8,
            bottom: 5,
            justifyContent: 'center',
            alignItems: 'center',
            // alignContent: 'center',
            zIndex: 100,
          }}>
          <Text
            style={{
              color: resources.colors.white,
              fontSize: wp('3.5%'),
              fontFamily: resources.fonts.manropeBold,
              fontWeight: '600',
              bottom: Platform.OS == 'ios' ? 0 : 4,
            }}>
            {totalCartItems}
          </Text>
        </View>
        <Image
          source={resources.images.bag}
          style={{
            width: 20,
            height: 20,
            resizeMode: 'contain',
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default HomeHeader;
