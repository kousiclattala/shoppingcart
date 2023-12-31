import React from 'react';
import {
  View,
  Text,
  NativeModules,
  StatusBar,
  TouchableOpacity,
  Platform,
  Image,
} from 'react-native';
import resources from '../resources';
import CustomStatusBar from './CustomStatusBar';
import IonIcon from 'react-native-vector-icons/Ionicons';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SubHeaderProps} from '../types/Types';
import {useAppSelector} from '../redux/hooks';

const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  isScrolled,
  onPress,
  onCartPress,
}) => {
  const {StatusBarManager} = NativeModules;

  const {totalCartItems} = useAppSelector(state => state.auth);

  return (
    <View>
      <CustomStatusBar />

      <View
        style={{
          flexDirection: 'row',
          width: wp('100%'),
          height: hp('7%'),
          backgroundColor: isScrolled ? resources.colors.white : 'transparent',
        }}>
        <View
          style={{
            width: wp('70%'),
            height: hp('7%'),
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: 50,
              height: 50,
              backgroundColor: resources.colors.black1,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
              marginStart: wp('5%'),
            }}
            onPress={onPress}>
            <IonIcon
              name="chevron-back"
              size={20}
              color={resources.colors.black100}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: resources.colors.black,
              fontFamily: resources.fonts.manropeRegular,
              fontWeight: '400',
              letterSpacing: 0.5,
              fontSize: wp('5%'),
              marginStart: wp('5%'),
            }}>
            {title} {title == 'Shopping Cart' ? `(${totalCartItems})` : ''}
          </Text>
        </View>
        {title !== 'Shopping Cart' && (
          <TouchableOpacity
            style={{
              width: wp('30%'),
              height: hp('7%'),
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
            }}
            onPress={onCartPress}>
            <View
              style={{
                width: 20,
                height: 20,
                borderRadius: 100,
                backgroundColor: resources.colors.yellow_light,
                position: 'absolute',
                left: 58,
                bottom: 28,
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
                  bottom: Platform.OS == 'ios' ? 0 : 3,
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
                tintColor: resources.colors.black,
              }}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default SubHeader;
