import {View, Text, Platform} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTabButton = ({color, size = 20, icon}) => {
  return (
    <View className={`flex flex-col items-center justify-center `}>
      <Icon name={icon} size={size} color={color} />
    </View>
  );
};

export default BottomTabButton;
