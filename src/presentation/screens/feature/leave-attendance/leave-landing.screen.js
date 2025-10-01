import {View, Text, Pressable, ScrollView, Image} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Layout from '@components/layout.component';
import {navigate} from '../../../../applications/utils/RootNavigation';

const Button = ({icon, onPress, title, pills = 0}) => (
  <Pressable onPress={onPress}>
    <HStack
      className="px-3 py-2 bg-white border border-primary-950/10 items-center rounded-md justify-between"
      space={3}>
      <Text
        className="flex-1 text-primary-950 text-sm"
        style={{fontFamily: 'OpenSans-SemiBold'}}>
        {title}
      </Text>
      <HStack className="items-center">
        {pills > 0 && (
          <View className="bg-primary-500 rounded-full px-2 py-1 w-11 items-center justify-center">
            <Text
              className="text-white text-xs"
              style={{fontFamily: 'Inter-Bold'}}>
              {pills}
            </Text>
          </View>
        )}
        <Icon name="chevron-forward" size={25} color={'rgb(73, 6, 9)'} />
      </HStack>
    </HStack>
  </Pressable>
);

const LeaveLanding = () => {
  return (
    <Layout>
      <VStack className="px-5 pt-2">
        <Header title="Cuti & Perizinan Lainnya" back={true} />
      </VStack>
      <VStack className="px-5 bg-[#fafafa] flex-1 pb-8 space-y-2">
        <VStack space={3}>
          <Button
            title="Pengajuan Cuti"
            onPress={() => {
              navigate('leave');
            }}
          />
        </VStack>
      </VStack>
    </Layout>
  );
};

export default LeaveLanding;
