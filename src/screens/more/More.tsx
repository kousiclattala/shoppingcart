import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import resources from '../../resources';
import CustomStatusBar from '../../components/CustomStatusBar';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeHeader from '../home/HomeHeader';
import {TouchableOpacity} from 'react-native-gesture-handler';
import IonIcon from 'react-native-vector-icons/Ionicons';
import FA5Icon from 'react-native-vector-icons/FontAwesome5';

const More = () => {
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
        <HomeHeader title="More" />
      </View>

      <View
        style={{
          flex: 1,
          marginBottom: hp('2%'),
        }}>
        <ScrollView>
          <View style={styles.container}>
            <Image
              source={resources.images.user}
              style={{
                width: 150,
                height: 150,
                borderRadius: 100,
                resizeMode: 'contain',
              }}
            />

            <Text
              style={{
                color: resources.colors.black100,
                fontSize: wp('5%'),
                fontFamily: resources.fonts.manropeMedium,
                fontWeight: '500',
                letterSpacing: 0.6,
                marginTop: hp('2%'),
              }}>
              Kousic
            </Text>
          </View>

          <View
            style={{
              marginTop: hp('2%'),
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.item}>
                <FA5Icon name="user" size={30} color={resources.colors.black} />
                <Text style={styles.itemText}>Profile</Text>
              </View>
              <View style={styles.item}>
                <FA5Icon
                  name="map-marked-alt"
                  size={30}
                  color={resources.colors.black}
                />
                <Text style={styles.itemText}>Addresses</Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View style={styles.item}>
                <FA5Icon
                  name="box-open"
                  size={30}
                  color={resources.colors.black}
                />
                <Text style={styles.itemText}>Orders</Text>
              </View>

              <View style={styles.item}>
                <IonIcon name="card" size={30} color={resources.colors.black} />
                <Text style={styles.itemText}>Cards</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity
            style={[
              styles.logoutBtn,
              Platform.OS == 'ios'
                ? resources.styles.iosShadow
                : resources.styles.androidShadow,
            ]}>
            <Text
              style={{
                color: resources.colors.white,
                fontSize: wp('4%'),
                fontFamily: resources.fonts.maropeSemiBold,
                fontWeight: '600',
                letterSpacing: 0.6,
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: wp('100%'),
    height: hp('25%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  item: {
    width: wp('45%'),
    height: hp('18%'),
    borderRadius: 20,
    marginHorizontal: wp('2.55%'),
    backgroundColor: resources.colors.black1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: hp('2%'),
  },
  logoutBtn: {
    width: wp('90%'),
    height: hp('7%'),
    borderRadius: 20,
    backgroundColor: resources.colors.blue_secondary,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    marginVertical: hp('2%'),
  },
  itemText: {
    color: resources.colors.black100,
    fontSize: wp('4%'),
    fontFamily: resources.fonts.manropeRegular,
    fontWeight: '400',
    letterSpacing: 0.6,
    marginTop: hp('2%'),
  },
});

export default More;
