import {View, Text} from 'react-native';
import React from 'react';
import {Divider, HStack, Skeleton, VStack} from 'native-base';

const Loading = () => (
  <VStack
    w="100%"
    borderWidth="1"
    space={2}
    overflow="hidden"
    rounded="md"
    p="4"
    mb="3"
    _dark={{
      borderColor: 'coolGray.500',
    }}
    _light={{
      borderColor: 'coolGray.200',
    }}>
    <View className="flex flex-row space-x-3 items-center">
      <View className="flex flex-1 flex-col space-y-1">
        <Skeleton h={2} rounded="full" w={100} />
        <Skeleton h={1.5} rounded="full" w="100%" />
      </View>
      <View className="flex flex-1 items-end justify-end">
        <Skeleton h={2} rounded="full" w={100} />
      </View>
    </View>
    <Divider />
    <View className="flex flex-row space-x-3 items-center my-3">
      <View className="flex flex-1 flex-col space-y-1">
        <Skeleton h={1.5} rounded="full" w="60%" />
        <Skeleton h={2} rounded="full" w="100%" />
        <Skeleton h={2} rounded="full" w="100%" />
      </View>
      <View className="flex flex-1 flex-col space-y-1">
        <Skeleton h={1.5} rounded="full" w="60%" />
        <Skeleton h={2} rounded="full" w="100%" />
        <Skeleton h={2} rounded="full" w="100%" />
      </View>
      <View className="flex flex-1 flex-col space-y-1">
        <Skeleton h={1.5} rounded="full" w="60%" />
        <Skeleton h={2} rounded="full" w="100%" />
        <Skeleton h={2} rounded="full" w="100%" />
      </View>
    </View>
    <Divider />
    <View className="flex flex-row space-x-3 items-center">
      <View className="flex flex-1 flex-col space-y-1">
        <Skeleton h={1.5} rounded="full" w="60%" />
        <Skeleton h={1.5} rounded="full" w="60%" />
      </View>
      <View className="flex flex-1 flex-col space-y-1 items-end justify-center py-1">
        <Skeleton h={1.5} rounded="full" w="30%" />
      </View>
    </View>
  </VStack>
);

const HazardListLoad = () => {
  return (
    <View className="flex my-3">
      <Loading />
      <Loading />
      <Loading />
    </View>
  );
};

export default HazardListLoad;
