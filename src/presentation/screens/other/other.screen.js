import {View, Text, Pressable, ScrollView} from 'react-native';
import React from 'react';
import Header from '@components/navigation/header.component';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {push} from '@utils/RootNavigation';
import Layout from '@components/layout.component';

const Tab = createMaterialTopTabNavigator();

const Button = ({icon, onPress, title}) => (
  <Pressable onPress={onPress}>
    <HStack
      className="px-3 py-2 bg-white shadow-sm shadow-primary-950/20 items-center rounded-md"
      space={3}>
      {icon}
      <Text
        className="flex-1 text-primary-950 text-sm capitalize"
        style={{fontFamily: 'OpenSans-SemiBold'}}>
        {title}
      </Text>
      <Entypo name="chevron-right" size={25} color={'rgb(73, 6, 9)'} />
    </HStack>
  </Pressable>
);

const Other = () => {
  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="px-5">
          <Header
            back={
              <Text
                className="text-xl text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                Lainnya
              </Text>
            }
          />
          <VStack space={5} className="space-y-5 pt-5">
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
        </View>
      </ScrollView>
      {/* <Tab.Navigator
          screenOptions={{
            swipeEnabled: false,
          }}
          tabBar={props => (
            <View
              className="px-5 pt-5
            ">
              <TabBar {...props} />
            </View>
          )}>
          <Tab.Screen name="Tunda" component={Upcoming} />
          <Tab.Screen name="Setuju" component={Past} />
          <Tab.Screen name="Confirm" component={Confirm} />
          <Tab.Screen name="Teds" component={Confirm} />
        </Tab.Navigator> */}
    </Layout>
  );
};

export default Other;
