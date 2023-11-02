import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../../utils/RootNavigation';

const Header = ({back = false, title, rightIcon = false, containerStyle}) => {
  return (
    <View
      className={`flex-row justify-between items-center pb-3 ${containerStyle}`}>
      {back ? back : <View></View>}
      <Text
        className="text-xl text-primary-950 ml-4"
        style={{fontFamily: 'Inter-Bold'}}>
        {title}
      </Text>
      {rightIcon ? rightIcon : <View></View>}
    </View>
  );
};

export default Header;
