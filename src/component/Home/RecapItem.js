import {View, Text} from 'react-native';
import React from 'react';

const RecapItem = ({type, value}) => {
  return (
    <View className="justify-between items-center flex-1">
      <Text
        className="text-4xl text-black"
        style={{fontFamily: 'OpenSans-Bold'}}>
        {value}
      </Text>
      <Text
        className="text-center text-slate-500"
        style={{fontFamily: 'OpenSans-Medium'}}>
        {type}
      </Text>
    </View>
  );
};

export default RecapItem;
