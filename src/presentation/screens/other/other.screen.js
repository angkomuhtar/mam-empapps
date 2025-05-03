import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {push} from '@utils/RootNavigation';
import Layout from '@components/layout.component';

const Tab = createMaterialTopTabNavigator();

const Button = ({icon, onPress, title, pills = 0}) => (
  <Pressable onPress={onPress}>
    <HStack
      className="px-3 py-2 bg-white border border-primary-950/10 items-center rounded-md justify-between"
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
        <Icon name="chevron-forward" size={25} color={'rgb(73, 6, 9)'} />
      </HStack>
    </HStack>
  </Pressable>
);

const Other = () => {
  return (
    <Layout>
      <VStack px={5} className="flex-1">
        <Header back={true} title="Lainnya" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} className="space-y-3">
            <Button
              title="lupa absen"
              icon={
                <Icon
                  name="calendar-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              onPress={() => {
                alert('Under Construction');
              }}
            />
            <Button
              title="Perintah Lembur"
              icon={
                <Icon
                  name="speedometer-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              onPress={() => {
                alert('Under Construction');
              }}
            />

            <Button
              title="Approval Request"
              icon={
                <Icon
                  name="document-attach-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              onPress={() => {
                push('approval-request');
              }}
            />

            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-primary-950">
              Lainnya
            </Text>

            <Button
              title="Cuti dan Ijin"
              icon={
                <Icon name="walk-outline" size={20} color={'rgb(73, 6, 9)'} />
              }
              onPress={() => {
                push('leave');
              }}
            />
            <Button
              title="Klaim and Rembes"
              icon={
                <Icon name="wallet-outline" size={20} color={'rgb(73, 6, 9)'} />
              }
              onPress={() => {
                alert('Under Construction');
              }}
            />

            {/* document-attach-outline */}
            {/* 
              <HStack space={5}>
                <KuotaCard title="Kuota Cuti" value="12 Hari" />
                <KuotaCard title="Disetujui" value="12" />
              </HStack>
              <HStack space={5}>
                <KuotaCard title="Tertunda" value="10" />
                <KuotaCard title="Ditolak" value="8" />
              </HStack> */}
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default Other;
