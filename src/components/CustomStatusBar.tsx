import React from 'react';
import {View, Text, NativeModules, StatusBar} from 'react-native';
import {useAppSelector} from '../redux/hooks';

const CustomStatusBar = () => {
  const {StatusBarManager} = NativeModules;
  const {backgroundColor, barStyle} = useAppSelector(state => state.auth);

  return (
    <View>
      <StatusBar
        barStyle={barStyle}
        backgroundColor={backgroundColor}
        translucent={true}
      />

      <View
        style={{
          height: StatusBarManager.HEIGHT,
          backgroundColor: backgroundColor,
        }}
      />
    </View>
  );
};

export default CustomStatusBar;
