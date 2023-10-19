import {View, Text, Platform} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextMontserrat} from '../Text';

const NavButton = ({color, text, icon}) => {
  return (
    <View
      className={`flex flex-col items-center justify-center ${
        Platform.OS == 'ios' && 'mt-2'
      }`}>
      <Icon name={icon} size={20} color={color} />
      <Text
        className="text-[11px] uppercase mt-1"
        style={{color: color, fontFamily: 'Inter-SemiBold'}}>
        {text}
      </Text>
    </View>
  );
};

export default NavButton;
