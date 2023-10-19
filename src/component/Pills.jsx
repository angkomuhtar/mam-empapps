import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

const Pills = ({active = false, value}) => {
  return (
    <TouchableOpacity className="mr-3">
      <View
        className={`${
          active ? 'bg-primary-500' : 'bg-primary-100'
        } py-2 px-4 rounded-md`}>
        <Text
          className={`${active ? 'text-white' : 'text-primary-950'}`}
          style={{fontFamily: 'Inter-Regular'}}>
          {value}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Pills;
