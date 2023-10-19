import {Platform, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '../../utils/RootNavigation';

const BackButton = () => {
  return (
    <TouchableOpacity
      onPress={() => goBack()}
      className={`bg-white/70 shadow-sm shadow-primary-100 self-start p-2 my-4 ${
        Platform.OS == 'ios' ? 'top-8' : 'top-0'
      } rounded-full ml-5 absolute z-50`}>
      <Icon name="ios-chevron-back-outline" size={30} />
    </TouchableOpacity>
  );
};

export default BackButton;
