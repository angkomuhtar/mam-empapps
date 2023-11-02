import {View, Text, TouchableOpacity, TextInput} from 'react-native';
import React, {useState} from 'react';
import Layout from '../../components/layout.component';
import {HStack, VStack} from 'native-base';
import Header from '../../components/navigation/header.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {goBack} from '@utils/RootNavigation';
import Input from '../../components/input.component';
import {useChangePassMutation} from '../../../applications/slices/user.slice';
import Loading from '../../components/loading.component';
import Alert from '../../components/alert.component';
import {navigate} from '../../../applications/utils/RootNavigation';

const ChangePassword = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [oldEye, setOldEye] = useState(true);
  const [newEye, setNewEye] = useState(true);
  const [body, setBody] = useState({
    password: '',
    new_password: '',
  });
  const [changePass, {isError, error, isLoading, isSuccess}] =
    useChangePassMutation();

  console.log('err', isError, error);
  return (
    <Layout>
      {isSuccess && (
        <Alert
          title="Berhasil"
          visible={true}
          message="Password baru berhasil di ubah"
          onOk={() => goBack()}
        />
      )}
      {isLoading && <Loading />}
      <VStack className="px-5 min-h-full">
        <Header
          back={
            <HStack alignItems={'center'} space={3}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  name="chevron-back-outline"
                  color={'rgb(73, 6, 9)'}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                className="text-xl text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                Ganti Password
              </Text>
            </HStack>
          }
        />
        <VStack className="flex-1 mb-5" space={5}>
          <View>
            <Input
              placeholder="Password"
              keyboardType="default"
              value={body.password}
              onChangeText={password => {
                setBody({
                  ...body,
                  password,
                });
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
            {error?.message?.password && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {error.message?.password[0]}
              </Text>
            )}
          </View>
          <View>
            <Input
              placeholder="Password"
              keyboardType="default"
              value={body.new_password}
              onChangeText={new_password => {
                setBody({
                  ...body,
                  new_password,
                });
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

            {error?.message?.new_password && (
              <Text
                className="text-primary-500 capitalize ml-2 mt-2"
                style={{fontFamily: 'Inter-Medium'}}>
                {error.message?.new_password[0]}
              </Text>
            )}
          </View>
        </VStack>
        <TouchableOpacity
          onPress={() => changePass(body)}
          className="bg-primary-500 p-4 items-center rounded-md mb-8">
          <Text
            className="text-base text-white uppercase"
            style={{fontFamily: 'Inter-SemiBold'}}>
            Ganti Passsword
          </Text>
        </TouchableOpacity>
      </VStack>
    </Layout>
  );
};

export default ChangePassword;
