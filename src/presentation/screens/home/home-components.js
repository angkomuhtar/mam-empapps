import {HStack, Stack, VStack} from 'native-base';
import {Dimensions, Image, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

let width = Dimensions.get('screen').width;

export const TimeCard = ({icon, label, value}) => (
  <HStack
    className="items-center space-x-3 rounded-md px-2 py-2 bg-white"
    style={{width: width / 2 - 40}}>
    <View className="border border-primary-100 rounded-lg p-2">
      <Icon name={icon} size={25} color="#FB3640" />
    </View>
    <VStack className="space-between flex-1">
      <Text
        className="text-[11px] capitalize mb-1"
        style={{fontFamily: 'OpenSans-Medium'}}>
        {label}
      </Text>
      <Text
        className="text-xl text-black mt-0.5"
        style={{fontFamily: 'Inter-Bold'}}>
        {value}
      </Text>
    </VStack>
  </HStack>
);

export const Menu = ({label, source, onpress, num, index}) => {
  const widthDiv = width / num - 16;
  return (
    <HStack>
      {(index + num) % num !== 0 && (
        <View className="h-full pt-5">
          <View className="h-5 w-[1px] mx-1 bg-slate-300"></View>
        </View>
      )}
      <View
        key={index}
        className={`items-center my-2 px-1`}
        style={{width: widthDiv - 6}}>
        <TouchableOpacity onPress={onpress} className="items-center">
          <Stack className="w-full rounded-lg aspect-[4/2] mb-1 px-4">
            <Image
              resizeMode="contain"
              alt=""
              className="w-full h-full"
              source={source}
            />
          </Stack>
          <Text
            className="text-center text-[10px] leading-1 text-black capitalize"
            style={{fontFamily: 'OpenSans-Bold'}}>
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    </HStack>
  );
};
