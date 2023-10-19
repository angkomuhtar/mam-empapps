import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from './Layout';
import Logo from '@images/logo-land.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {VStack, useToast} from 'native-base';
import {getUniqueId} from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import {login} from '../stores/auth.reducer';
import Loading from '../component/Loading';
import Input from '../component/Input';

const Login = () => {
  const dispatch = useDispatch();
  const [eye, setEye] = useState(true);
  const [data, setData] = useState({
    email: '',
    password: '',
    phone_id: '',
  });
  const toast = useToast();

  const {isLoading, error} = useSelector(state => state.auth);

  useEffect(() => {
    getUniqueId().then(uniqueId => {
      setData({...data, phone_id: uniqueId});
    });
  }, []);

  const loginHandle = () => {
    if (data.email == '' || data.password == '') {
      alert('email dan password harus di isi');
    } else {
      dispatch(login(data));
    }
  };

  useEffect(() => {
    if (error) {
      toast.show({
        render: () => (
          <View className="px-4 py-2 bg-primary-600 rounded-lg">
            <Text className="font-sans font-semibold text-white capitalize">
              {error?.statusCode == 422 ? error?.msg?.password[0] : error?.msg}
            </Text>
          </View>
        ),
        placement: 'bottom',
        duration: 1000,
      });
    }
    // console.log('ERR RESP', error);
  }, [error]);

  return (
    <Layout>
      {Platform.OS == 'ios' && <View className="h-8" />}
      {/* <BackButton /> */}
      {/* <Loading /> */}

      {isLoading && <Loading />}
      <VStack space="5" m={5} className="flex-1 py-8">
        <View className="flex">
          <Image source={Logo} resizeMode="contain" className="w-36 h-14" />
        </View>
        <VStack space={2}>
          <Text
            className="text-3xl text-primary-950"
            style={{fontFamily: 'Inter-Black'}}>
            Selamat Datang,
          </Text>
          <Text
            className="text-3xl text-primary-950"
            style={{fontFamily: 'Inter-Black'}}>
            di <Text className="text-primary-500">EMPLOYEE APPS</Text>
          </Text>
        </VStack>
        <VStack space={6}>
          <Input
            placeholder="Username / Email"
            style={{fontFamily: 'Inter-Light'}}
            keyboardType="default"
            value={data.email}
            onChangeText={text => {
              setData({...data, email: text});
              console.log(text);
            }}
            title="Email/Username"
          />
          <Input
            placeholder="Password"
            keyboardType="default"
            value={data.password}
            onChangeText={text => {
              setData({...data, password: text});
            }}
            style={{fontFamily: 'Inter-Light'}}
            secureTextEntry={eye}
            title="Password"
            rightIcon={
              <TouchableOpacity
                onPress={() => {
                  setEye(!eye);
                }}
                className="justify-center bg-transparent top-1 bottom-1">
                <Icon
                  color={'rgb(73, 6, 9)'}
                  name={eye ? 'ios-eye-off-outline' : 'ios-eye-outline'}
                  size={30}
                />
              </TouchableOpacity>
            }></Input>
          <TouchableOpacity
            onPress={() => loginHandle()}
            className="bg-primary-500 p-3 rounded-md items-center">
            <Text
              className="text-primary-50 text-sm"
              style={{fontFamily: 'Inter-Regular'}}>
              MASUK
            </Text>
          </TouchableOpacity>
        </VStack>
      </VStack>
    </Layout>
  );
};

export default Login;
