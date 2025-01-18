import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import Layout from '../../presentation/components/layout.component';
import {HStack, Pressable, VStack} from 'native-base';
import Header from '../../presentation/components/navigation/header.component';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {navigate, push} from '../utils/RootNavigation';

const Button = ({icon, onPress, title, pills = 0}) => (
  <Pressable onPress={onPress}>
    <HStack
      className="px-3 py-2 bg-white shadow-sm shadow-primary-950/20 items-center rounded-md justify-between"
      space={3}>
      {icon}
      <Text
        className="flex-1 text-primary-950 text-sm capitalize"
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
        <Entypo name="chevron-right" size={25} color={'rgb(73, 6, 9)'} />
      </HStack>
    </HStack>
  </Pressable>
);

const RequestReportStack = () => {
  return (
    <Layout>
      <VStack px={5} pt={2} className="flex-1">
        <Header back={true} title="Pengajuan & Laporan" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} className="space-y-3">
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-primary-950">
              Laporan
            </Text>
            <Button
              title="Hazard Report"
              icon={
                <Icon
                  name="briefcase-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              onPress={() => {
                navigate('hazard-report');
              }}
            />

            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-primary-950">
              Pengajuan
            </Text>
            <Button
              title="Pengajuan Cuti / Izin"
              icon={
                <Icon
                  name="briefcase-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              onPress={() => {
                alert('Under Construction');
              }}
            />
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default RequestReportStack;
