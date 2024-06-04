import {View, Text, TouchableOpacity, TextInput, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import Logo from '@images/logo-land.png';
import Icon from 'react-native-vector-icons/Ionicons';
import {VStack, useToast} from 'native-base';
import {
  getUniqueId,
  getDevice,
  getCodename,
  getBrand,
  getDeviceId,
  getModel,
} from 'react-native-device-info';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '@components/loading.component';
import Input from '@components/input.component';
import Alert from '@components/alert.component';
import {login} from '../../../applications/actions/auth.action';
import {Controller, useForm} from 'react-hook-form';

const Login = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors: validError},
    setValue,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      phone_id: '',
    },
  });

  const toast = useToast();
  const dispatch = useDispatch();
  const [eye, setEye] = useState(true);
  const [data, setData] = useState({
    email: '',
    password: '',
    phone_id: '',
  });
  const [alert, setAlert] = useState({
    visible: false,
    type: '',
    message: '',
  });
  const [user, setUser] = useState(null);

  const {loading, token, error, success} = useSelector(state => state.auth);

  const toatsShow = ({message = 'terjadi kesalahan', errno = '500'}) => {
    toast.show({
      render: () => (
        <View className="px-4 py-2 bg-primary-600 rounded-lg">
          <Text className="font-sans font-semibold text-white capitalize">
            {errno + ' : ' + message}
          </Text>
        </View>
      ),
      placement: 'bottom',
      duration: 3000,
    });
  };

  useEffect(() => {
    getUniqueId().then(uniqueId => {
      getDevice().then(device_type => {
        getCodename().then(code_name => {
          let brand = getBrand();
          let device_id = getDeviceId();
          let model = getModel();
          setValue('phone_id', uniqueId);
          setData({
            ...data,
            device_brand: brand,
            device_id: device_id,
            device_type: device_type,
            phone_id: uniqueId,
            model: model,
          });
        });
      });
    });
  }, []);
  const loginHandle = data => {
    dispatch(login(data));
  };
  useEffect(() => {
    if (error) {
      console.log(error);
      toast.show({
        render: () => (
          <View className="px-4 py-2 bg-primary-600 rounded-lg">
            <Text className="font-sans font-semibold text-white capitalize">
              {error?.status == 422
                ? error?.message?.password[0]
                : error?.status == 401
                ? error?.message
                : 'Terjadi Kesalahan periksa koneksi anda'}
            </Text>
          </View>
        ),
        placement: 'bottom',
        duration: 3000,
      });
    }
  }, [error]);

  return (
    <Layout>
      {Platform.OS == 'ios' && <View className="h-8" />}
      <Alert
        visible={alert.visible}
        type="error"
        title="Validation"
        message="Data tidak lengkap"
        onOk={() => setAlert({...alert, visible: false})}
      />

      {loading && <Loading />}
      <VStack m={5} className="flex-1 py-8">
        <View className="flex mb-4">
          <Image source={Logo} resizeMode="contain" className="w-36 h-14" />
        </View>
        <VStack className="space-y-2 mb-4">
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
        <VStack>
          <Controller
            control={control}
            rules={{
              required: {
                message: 'tidak boleh kosong',
                value: true,
              },
            }}
            name="email"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Username / Email"
                style={{fontFamily: 'Inter-Light'}}
                keyboardType="default"
                onBlur={onBlur}
                value={value}
                onChangeText={onChange}
                title="Email/Username"
              />
            )}
          />
          {validError.email && (
            <Text className="text-red-500 text-xs ml-2 mt-1">
              {validError.email?.message}
            </Text>
          )}
          <Controller
            control={control}
            rules={{
              required: {
                value: true,
                message: 'tidak boleh kosong',
              },
              minLength: {
                message: 'password minimal 6 karakter',
                value: 6,
              },
            }}
            name="password"
            render={({field: {onChange, onBlur, value}}) => (
              <Input
                placeholder="Password"
                keyboardType="default"
                onChangeText={onChange}
                onBlur={onBlur}
                value={value}
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
            )}
          />
          {validError.password && (
            <Text className="text-red-500 text-xs ml-2 mt-1">
              {validError.password?.message}
            </Text>
          )}

          <TouchableOpacity
            onPress={handleSubmit(loginHandle)}
            className="bg-primary-500 p-3 rounded-md items-center mt-8">
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
