import {View, Text, Platform} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomTabButton = ({color, text, icon}) => {
  return (
    <View className={`flex flex-col items-center justify-center `}>
      <Icon name={icon} size={20} color={color} />
    </View>
  );
};

export default BottomTabButton;
