import {View, Text} from 'react-native';
import React from 'react';

const UnderMaintain = () => {
  return (
    <View className="px-4 justify-center items-center">
      <Image source={Logo} className="w-3/4" resizeMode="contain" />
      <TextMontserrat
        weight="Bold"
        class="text-center text-xl text-primary-950 capitalize">
        Features will enable soon
      </TextMontserrat>
      <TextMontserrat
        weight="Semibold"
        class="text-center text-sm text-primary-950 mt-2">
        this feature is underconstruction
      </TextMontserrat>
    </View>
  );
};

export default UnderMaintain;
