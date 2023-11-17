import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from 'react-native';
import React from 'react';
import Header from '../../../../components/navigation/header.component';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import TabBar from '../../../../components/navigation/tab-bar.component';
import {goBack, push} from '@utils/RootNavigation';
import Layout from '../../../../components/layout.component';
import {navigate} from '../../../../../applications/utils/RootNavigation';
import ApprovalLeaveHistory from './approval-leave-history.screen';
import ApprovalLeaveNew from './approval-leave-new.screen';

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

const ApprovalLeave = () => {
  return (
    <Layout>
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}
      <View className="px-5">
        <Header
          back={
            <HStack alignItems={'center'} space={3}>
              <TouchableOpacity onPress={() => navigate('others')}>
                <Icon
                  name="chevron-back-outline"
                  color={'rgb(73, 6, 9)'}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                className="text-base text-primary-950"
                style={{fontFamily: 'OpenSans-Bold'}}>
                Permmohonan Cuti / Ijin
              </Text>
            </HStack>
          }
        />
      </View>
      <Tab.Navigator
        screenOptions={{
          swipeEnabled: false,
        }}
        backBehavior={() => navigate('others')}
        tabBar={props => (
          <View
            className="px-5
          ">
            <TabBar {...props} />
          </View>
        )}>
        <Tab.Screen
          name="leaveadd"
          options={{tabBarLabel: 'Baru'}}
          component={ApprovalLeaveNew}
        />
        <Tab.Screen
          name="leaveList"
          options={{tabBarLabel: 'Riwayat'}}
          component={ApprovalLeaveHistory}
        />
      </Tab.Navigator>
      <VStack height={12}></VStack>
    </Layout>
  );
};

export default ApprovalLeave;
