import {
  View,
  Text,
  ScrollView,
  Dimensions,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {Avatar, Button, HStack, VStack} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {logout} from '../stores/auth.reducer';
import Header from '../component/navigation/Header';
import Icon from 'react-native-vector-icons/Ionicons';
import EncryptedStorage from 'react-native-encrypted-storage';
import {useFocusEffect} from '@react-navigation/native';
import Loading from '../component/Loading';
import Layout from './Layout';

const Settings = ({navigation}) => {
  let width = Dimensions.get('screen').width;
  const {isLoading} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [users, setUsers] = useState(null);

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

  const getSession = async () => {
    try {
      const session = await EncryptedStorage.getItem('user_session');

      if (session !== undefined) {
        setUsers(JSON.parse(session));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getSession();
    }, [navigation]),
  );

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-row py-3 justify-between items-center px-5">
          <Text
            className="text-xl text-primary-950"
            style={{fontFamily: 'Inter-Bold'}}>
            Pengaturan
          </Text>
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

export default Settings;
