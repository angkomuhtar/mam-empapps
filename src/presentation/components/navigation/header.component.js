import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '@utils/RootNavigation';

const Header = ({back = false, title, rightIcon = false, containerStyle}) => {
  return (
    <View
      className={`flex-row justify-between items-center pb-3 ${containerStyle} pt-10`}>
      {back ? (
        <TouchableOpacity onPress={() => goBack()}>
          <Icon name="chevron-back-outline" color={'rgb(73, 6, 9)'} size={20} />
        </TouchableOpacity>
      ) : (
        <View></View>
      )}
      <Text
        className="text-sm text-primary-950 flex-1 ml-2"
        style={{fontFamily: 'OpenSans-Bold'}}>
        {title}
      </Text>
      {rightIcon ? rightIcon : <View></View>}
    </View>
  );
};

export default Header;
