import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React from 'react';
import Layout from '../../components/layout.component';
import {HStack, VStack} from 'native-base';
import Header from '../../components/navigation/header.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack, navigate} from '../../../applications/utils/RootNavigation';
import DetailValue from '../../components/detail-value.component';
import {useGetProfileQuery} from '@slices/user.slice';
import moment from 'moment';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Upcoming from '../leave/leave-tabs/upcoming.screen';
import TabBar from '../../components/navigation/tab-bar.component';

const Profile = () => {
  const {data: users} = useGetProfileQuery();

  console.log(users?.employee);

  const Profile = () => (
    <ScrollView className="pb-5" showsVerticalScrollIndicator={false}>
      <VStack space={3} mb={5}>
        <DetailValue label="nama" value={users?.profile.name} />
        <DetailValue
          label="Jenis kelamin"
          value={users?.profile.gender == 'M' ? 'Laki - Laki' : 'Perempuan'}
        />
        <DetailValue label="Telp" value={users?.profile.phone} />
        <DetailValue
          label="Pendidikan Terakhir"
          value={users?.profile.educations.value}
        />
        <DetailValue label="Agama" value={users?.profile.religions.value} />
        <DetailValue
          label="Status Pernikahan"
          value={
            users?.profile.marriages.kode +
            ' - ' +
            users?.profile.marriages.value
          }
        />
        <DetailValue
          label="Tempat Tanggal lahir"
          value={
            users?.profile.tmp_lahir +
            ' , ' +
            moment(users?.profile.tgl_lahir, 'Y-M-D').format('D-M-Y')
          }
        />
      </VStack>
    </ScrollView>
  );

  const Karyawan = () => (
    <ScrollView className="pb-5" showsVerticalScrollIndicator={false}>
      <VStack space={3} mb={5}>
        <DetailValue label="nomor induk karyawan" value={users?.employee.nip} />
        <DetailValue
          label="tanggal kontrak"
          value={moment(users?.employee.doh, 'Y-M-D').format('DD-MM-Y')}
        />
        <DetailValue label="divisi" value={users?.employee.division.division} />
        <DetailValue
          label="jabatan"
          value={users?.employee.position.position}
        />
        <DetailValue label="status karyawan" value={users?.employee.status} />
      </VStack>
    </ScrollView>
  );

  const Tab = createMaterialTopTabNavigator();

  return (
    <Layout>
      <VStack className="p-5 min-h-full">
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
        <Header
          back={
            <HStack alignItems={'center'} space={5}>
              <TouchableOpacity onPress={() => navigate('Setting')}>
                <Icon
                  name="chevron-back-outline"
                  color={'rgb(73, 6, 9)'}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                className="text-2xl text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                Data Pribadi
              </Text>
            </HStack>
          }
        />
        <VStack space={3} mb={5}>
          <Text
            className="py-3 text-lg text-slate-700"
            style={{fontFamily: 'Inter-SemiBold'}}>
            Data Pengguna
          </Text>
          <DetailValue label="email" value={users?.email} />
          <DetailValue label="Username" value={users?.username} />
        </VStack>
        <Tab.Navigator tabBar={props => <TabBar {...props} />}>
          <Tab.Screen name="Data Profil" component={Profile} />
          <Tab.Screen name="Data Karyawan" component={Karyawan} />
        </Tab.Navigator>

        <View className="h-5" />
        {/* </ScrollView> */}
      </VStack>
    </Layout>
  );
};

export default Profile;
