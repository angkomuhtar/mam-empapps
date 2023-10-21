import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Layout from '../../components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, HStack, ScrollView, VStack} from 'native-base';
import {useGetProfileQuery} from '@slices/user.slice';
import {useDispatch} from 'react-redux';
import Header from '../../components/navigation/header.component';
import {logout} from '../../../applications/actions/auth.action';

const ButtonB = ({text, icon, onPress}) => (
  <TouchableOpacity
    className="border-b border-primary-950/10 py-2"
    onPress={onPress}>
    <HStack className="py-2 items-center space-x-4 ">
      <View className="bg-primary-300/30 p-2 rounded-full">
        <Icon name={icon} size={18} color="#000" />
      </View>
      <View className="flex-1">
        <Text
          style={{fontFamily: 'Inter-Bold'}}
          className="text-sm text-primary-950">
          {text}
        </Text>
      </View>
      <Icon name="chevron-forward" size={20} color="#490609" />
    </HStack>
  </TouchableOpacity>
);
const Setting = () => {
  const {data: users} = useGetProfileQuery();
  const dispatch = useDispatch();

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="p-5">
          <Header
            back={
              <Text
                className="text-xl text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                Pengaturan
              </Text>
            }
          />
        </View>
        <VStack className="justify-center py-4 items-center ">
          <Avatar
            size="2xl"
            className="bg-transparent"
            source={require('../../assets/images/avatar.png')}>
            MM
          </Avatar>
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-lg mt-4 text-primary-950">
            {users?.profile?.name}
          </Text>
          <Text
            style={{fontFamily: 'Inter-Light'}}
            className="text-xs text-primary-950">
            {users?.employee?.division.division}
          </Text>
          <Text
            style={{fontFamily: 'Inter-Light'}}
            className="text-xs text-primary-950">
            {users?.employee?.position.position}
          </Text>
        </VStack>
        <View className="p-5 pb-10">
          <VStack className="space-y-2 bg-white px-4 rounded-lg border-2 border-primary-100/50">
            <ButtonB
              icon="ios-person-outline"
              text="Data Pribadi"
              onPress={() => {
                alert();
              }}
            />
            <ButtonB icon="ios-card-outline" text="Data Pengguna" />
            <ButtonB icon="ios-tv-outline" text="Data karyawan" />
            <ButtonB icon="trail-sign-outline" text="Term & Condition" />
            <ButtonB icon="shield-checkmark-outline" text="Privacy Policy" />
            <TouchableOpacity
              className="py-2"
              onPress={() => {
                dispatch(logout());
              }}>
              <HStack className="items-center space-x-4 ">
                <View className="bg-slate-500/10 p-2 rounded-full">
                  <Icon name="exit-outline" size={18} color="#000" />
                </View>
                <View className="flex-1">
                  <Text
                    style={{fontFamily: 'Inter-Bold'}}
                    className="text-sm text-primary-300">
                    Keluar
                  </Text>
                </View>
              </HStack>
            </TouchableOpacity>
          </VStack>
        </View>
      </ScrollView>
    </Layout>
  );
};

export default Setting;
