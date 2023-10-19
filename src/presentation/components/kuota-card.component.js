import {View, Text} from 'react-native';
import React from 'react';

const KuotaCard = ({title, value}) => {
  return (
    <View className="bg-white flex-1 space-y-2 border border-primary-100 p-3 rounded-lg">
      <Text
        className="text-slate-500 text-xs"
        style={{fontFamily: 'Inter-Bold'}}>
        {title}
      </Text>
      <Text
        className="text-primary-950 text-2xl"
        style={{fontFamily: 'Inter-SemiBold'}}>
        {value}
      </Text>
    </View>
  );
};

export default KuotaCard;
