import React, {useCallback} from 'react';
import {
  View,
  Text,
  StatusBar,
  NativeModules,
  Image,
  Platform,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import resources from '../../resources';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import IonIcon from 'react-native-vector-icons/Ionicons';
import HomeAddress from './HomeAddress';
import HomeHeader from './HomeHeader';
import HomeSearchBar from './HomeSearchBar';
import HomeBanners from './HomeBanners';
import HomeRecommended from './HomeRecommended';
import CustomStatusBar from '../../components/CustomStatusBar';
import {useAppDispatch} from '../../redux/hooks';
import {useFocusEffect} from '@react-navigation/native';
import {setBackgroundColor, setBarStyle} from '../../redux/authSlice';

const Home = () => {
  const dispatch = useAppDispatch();

  useFocusEffect(
    useCallback(() => {
      dispatch(setBarStyle('light-content'));
      dispatch(setBackgroundColor(resources.colors.blue_secondary));
    }, []),
  );

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: resources.colors.white,
      }}>
      <CustomStatusBar />

      <View
        style={{
          width: wp('100%'),
          height: hp('8%'),
          backgroundColor: resources.colors.blue_secondary,
        }}>
        <HomeHeader title="Hey Kousic" />
      </View>

      <FlatList
        data={[1]}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({item, index}) => (
          <>
            <View
              style={{
                width: wp('100%'),
                height: hp('20%'),
                backgroundColor: resources.colors.blue_secondary,
              }}>
              <HomeSearchBar />

              <HomeAddress />
            </View>

            <HomeBanners />

            <HomeRecommended />
          </>
        )}
      />
    </View>
  );
};

export default Home;
