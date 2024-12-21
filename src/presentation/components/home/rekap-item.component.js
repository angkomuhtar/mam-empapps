import {View, Text} from 'react-native';
import React from 'react';

const RecapItem = ({type, value}) => {
  return (
    <View className="flex-1">
      <Text
        className="text-xs text-white"
        style={{fontFamily: 'OpenSans-Regular'}}>
        {type}
      </Text>
      <Text className="text-2xl text-white" style={{fontFamily: 'Inter-Bold'}}>
        {value}
      </Text>
    </View>
  );
};

export default RecapItem;
