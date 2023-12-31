import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Platform,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  NativeScrollEvent,
  Pressable,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import resources from '../resources';
import {BOTTOM_BAR_ITEMS} from '../staticdata/StaticData';
import {BottomBarItemProps} from '../types/Types';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import Animated, {
  runOnJS,
  runOnUI,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const {width} = Dimensions.get('window');

const TAB_WIDTH = width / 4;

const BottomBar: React.FC<BottomTabBarProps> = props => {
  const {state, descriptors, navigation} = props;
  const translateX = useSharedValue(0);
  const focusedTab = state.index;

  const handleAnimate = (index: number) => {
    'worklet';
    translateX.value = withTiming(TAB_WIDTH * index - 7, {
      duration: 1000,
    });
  };

  console.log({width, value: translateX.value, TAB_WIDTH});

  useEffect(() => {
    runOnUI(handleAnimate)(focusedTab);
  }, [focusedTab]);

  const rnStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
      ],
    };
  });

  const _renderItem = (route: any, index: number) => {
    const {options} = descriptors[route.key];
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const isFocused = state.index === index;

    const iconBottom = useDerivedValue(() => {
      return isFocused
        ? withTiming(25, {
            duration: 1000,
          })
        : withTiming(0, {
            duration: 1000,
          });
    }, [isFocused]);

    const rnIconStyle = useAnimatedStyle(() => {
      return {
        bottom: iconBottom.value,
      };
    });

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name);
      }
    };

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      });
    };

    return (
      <AnimatedPressable
        key={index}
        style={[
          {
            flex: 1,
            width: wp('25%'),
            height: hp('10%'),
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
            backgroundColor: 'transparent',
            // bottom: isFocused ? 25 : 0,
          },
          rnIconStyle,
        ]}
        onPress={onPress}>
        <Image
          source={
            route.name == 'Home'
              ? resources.images.home
              : route.name == 'Categories'
              ? resources.images.category
              : route.name == 'Favourites'
              ? resources.images.heart
              : resources.images.more
          }
          style={{
            width: 30,
            height: 30,
            resizeMode: 'contain',
            tintColor: isFocused ? resources.colors.yellow : undefined,
          }}
        />

        {isFocused == false && (
          <Text
            style={{
              color: resources.colors.black60,
              fontFamily: resources.fonts.manropeLight,
              fontWeight: Platform.OS == 'ios' ? '400' : '500',
              letterSpacing: 0.6,
              fontSize: wp('3%'),
            }}>
            {label}
          </Text>
        )}
      </AnimatedPressable>
    );
  };

  return (
    <View
      style={[
        {
          width: wp('100%'),
          height: Platform.OS == 'ios' ? hp('12%') : hp('10%'),
          backgroundColor: '#fff',
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          flexDirection: 'row',
        },
        Platform.OS == 'ios'
          ? resources.styles.iosBottomShadow
          : resources.styles.androidBottomShadow,
      ]}>
      <Animated.View
        style={[
          {
            width: TAB_WIDTH,
            height: 90,
            borderRadius: 100,
            backgroundColor: resources.colors.black1,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'visible',
            position: 'absolute',
            bottom: Platform.OS == 'ios' ? 40 : 20,
            left: Platform.OS == 'ios' ? 5 : 7,
          },
          rnStyle,
        ]}>
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 100,
            backgroundColor: resources.colors.black100,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </Animated.View>

      {state.routes.map((route, index) => _renderItem(route, index))}
    </View>
  );
};

export default BottomBar;
