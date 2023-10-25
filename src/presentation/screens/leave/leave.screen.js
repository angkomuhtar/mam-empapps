import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Header from '../../components/navigation/header.component';
import {HStack} from 'native-base';
import KuotaCard from '../../components/kuota-card.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Upcoming from './leave-tabs/upcoming.screen';
import Past from './leave-tabs/past.screen';
import Confirm from './leave-tabs/confirm.screen';
import TabBar from '../../components/navigation/tab-bar.component';
import {push} from '../../../applications/utils/RootNavigation';
import Layout from '../../components/layout.component';

const Tab = createMaterialTopTabNavigator();

const Leave = () => {
  return (
    <Layout>
      <View className="p-5">
        <Header
          back={
            <Text
              className="text-2xl text-primary-950"
              style={{fontFamily: 'Inter-Bold'}}>
              Ijin / Cuti
            </Text>
          }
          rightIcon={
            <TouchableOpacity
              onPress={() => {
                push('leave-add');
              }}>
              <Icon
                name="ios-duplicate-outline"
                color={'rgb(73, 6, 9)'}
                size={25}
              />
            </TouchableOpacity>
          }
        />
        <View className="space-y-5">
          <HStack space={5}>
            <KuotaCard title="Kuota Cuti" value="12 Hari" />
            <KuotaCard title="Disetujui" value="12" />
          </HStack>
          <HStack space={5}>
            <KuotaCard title="Tertunda" value="10" />
            <KuotaCard title="Ditolak" value="8" />
          </HStack>
        </View>
      </View>
      <Tab.Navigator
        tabBar={props => (
          <View className="px-5">
            <TabBar {...props} />
          </View>
        )}>
        <Tab.Screen name="Upcoming" component={Upcoming} />
        <Tab.Screen name="Past" component={Past} />
        <Tab.Screen name="Confirm" component={Confirm} />
      </Tab.Navigator>
    </Layout>
  );
};

export default Leave;
