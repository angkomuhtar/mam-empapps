import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/layout.component';
import {HStack, VStack} from 'native-base';
import Header from '../../components/navigation/header.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '@utils/RootNavigation';
import Input from '../../components/input.component';

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [oldEye, setOldEye] = useState(true);
  const [newEye, setNewEye] = useState(true);

  return (
    <Layout>
      <VStack className="p-5 min-h-full">
        <Header
          back={
            <HStack alignItems={'center'} space={5}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  name="chevron-back-outline"
                  color={'rgb(73, 6, 9)'}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                className="text-2xl text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                Ganti Password
              </Text>
            </HStack>
          }
        />
        <VStack className="flex-1 mb-5" space={5}>
          <Input
            placeholder="Password"
            keyboardType="default"
            value={oldPass}
            onChangeText={text => {
              setOldPass(text);
            }}
            style={{fontFamily: 'Inter-Light'}}
            secureTextEntry={oldEye}
            title="Password"
            rightIcon={
              <TouchableOpacity
                onPress={() => {
                  setOldEye(!oldEye);
                }}
                className="justify-center bg-transparent top-1 bottom-1">
                <Icon
                  color={'rgb(73, 6, 9)'}
                  name={oldEye ? 'ios-eye-off-outline' : 'ios-eye-outline'}
                  size={30}
                />
              </TouchableOpacity>
            }
          />

          <Input
            placeholder="Password"
            keyboardType="default"
            value={newPass}
            onChangeText={text => {
              setNewPass(text);
            }}
            style={{fontFamily: 'Inter-Light'}}
            secureTextEntry={newEye}
            title="Password Baru"
            rightIcon={
              <TouchableOpacity
                onPress={() => {
                  setNewEye(!newEye);
                }}
                className="justify-center bg-transparent top-1 bottom-1">
                <Icon
                  color={'rgb(73, 6, 9)'}
                  name={newEye ? 'ios-eye-off-outline' : 'ios-eye-outline'}
                  size={30}
                />
              </TouchableOpacity>
            }
          />
        </VStack>
        <TouchableOpacity className="bg-primary-500 p-4 items-center rounded-md mb-5">
          <Text
            className="text-base text-white"
            style={{fontFamily: 'Inter-SemiBold'}}>
            Ganti Passsword
          </Text>
        </TouchableOpacity>
      </VStack>
    </Layout>
  );
};

export default ChangePassword;
