import {View, Text, TouchableOpacity, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import Layout from '@components/layout.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, HStack, ScrollView, Spinner, VStack} from 'native-base';
import {useGetProfileQuery} from '@slices/user.slice';
import {useDispatch} from 'react-redux';
import Header from '../../components/navigation/header.component';
import ReactNativeVersionInfo from 'react-native-version-info';
import {navigate} from '../../../applications/utils/RootNavigation';
import {useChangeAvatarMutation} from '../../../applications/slices/user.slice';
import ImagePicker from 'react-native-image-crop-picker';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import moment from 'moment';
import {useSetLogOutMutation} from '../../../applications/slices/auths.slice';
import Loading from '../../components/loading.component';
import {setLogin} from '../../../applications/slices/login.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {checkImage} from '../../../applications/utils/utils';
import {apiSlice} from '../../../applications/slices/api.slice';

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

const requestPermission = async () => {
  try {
    if (Platform.OS == 'ios') {
      const status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      if (status === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } else {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === 'granted') {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
};

const Setting = () => {
  const {data: users, isLoading: loading} = useGetProfileQuery();
  const [
    LogOut,
    {isLoading: logoutLoading, isError: logOutFalse, isSuccess: logOutTrue},
  ] = useSetLogOutMutation();
  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);
  const [changeAvatar, {isLoading, isError, isSuccess, error}] =
    useChangeAvatarMutation();

  useEffect(() => {
    if (isSuccess) {
      setSelectedFile(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    const LogOutEvent = async () => {
      await AsyncStorage.removeItem('@token');
      dispatch(setLogin(false));
      dispatch(apiSlice.util.resetApiState());
    };

    if (logOutTrue) {
      LogOutEvent();
    }
  }, [logOutTrue]);

  const openImagePicker = () => {
    const permission = requestPermission();
    permission.then(() => {
      const options = {
        mediaType: 'photo',
        maxHeight: 2000,
        maxWidth: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        cropperCircleOverlay: true,
      }).then(response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          // this.setState({response, modalVisible: false});
          // console.log(response);
          setSelectedFile(response);
        }
      });
    });
  };

  if (logoutLoading) {
    return <Loading />;
  }

  return (
    <Layout bg={false}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="flex-1 px-5">
          <Header back={false} title={'Settings'} />
        </View>
        <VStack className="justify-center py-4 px-5 items-center ">
          <VStack space="3" className="relative">
            {isLoading || loading ? (
              <>
                <View className="absolute top-0 bottom-0 right-0 left-0 bg-white/40 z-30 justify-center items-center">
                  <Spinner size={'lg'} />
                </View>
                <VStack className="relative">
                  <Avatar size="2xl" className="bg-black">
                    EU
                  </Avatar>
                </VStack>
              </>
            ) : (
              <VStack className="relative">
                {selectedFile ? (
                  <Avatar
                    size="2xl"
                    className="bg-transparent"
                    source={{
                      uri: selectedFile.path,
                    }}>
                    EU
                  </Avatar>
                ) : users?.avatar && checkImage(users.avatar_url) ? (
                  <Avatar
                    size="2xl"
                    className="bg-transparent"
                    source={{uri: users.avatar_url}}>
                    EU
                  </Avatar>
                ) : (
                  <Avatar
                    size="2xl"
                    className="bg-transparent"
                    source={require('../../assets/images/avatar.png')}>
                    MM
                  </Avatar>
                )}
                <TouchableOpacity
                  onPress={openImagePicker}
                  className="bg-primary-500 self-start p-2 rounded-full absolute bottom-0 right-0">
                  <Icon name="camera-reverse" size={20} color="#fff" />
                </TouchableOpacity>
              </VStack>
            )}
            {selectedFile && (
              <HStack space={3} className="justify-center">
                <TouchableOpacity
                  onPress={openImagePicker}
                  className="bg-primary-200 self-start p-2 rounded-lg justify-center items-center">
                  <Icon name="close-circle" size={15} color="#000" />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    var formData = new FormData();
                    var name = (selectedFile?.path).split('.');
                    formData.append('file', {
                      uri: selectedFile?.path,
                      type: selectedFile?.mime, // or photo.type
                      name:
                        'EmpApps-' +
                        moment().format('X') +
                        '.' +
                        name[name.length - 1],
                    });
                    changeAvatar(formData);
                  }}
                  className="bg-primary-500 self-start p-2 rounded-lg  justify-center items-center">
                  <Icon name="checkmark-done-circle" size={15} color="#fff" />
                </TouchableOpacity>
              </HStack>
            )}
          </VStack>
          <Text
            style={{fontFamily: 'Inter-Bold'}}
            className="text-lg mt-4 text-primary-950">
            {users?.profile?.name}
          </Text>
          <Text
            style={{fontFamily: 'Inter-Light'}}
            className="text-xs text-primary-950">
            {users?.employee?.division?.division}
          </Text>
          <Text
            style={{fontFamily: 'Inter-Light'}}
            className="text-xs text-primary-950">
            {users?.employee?.position.position}
          </Text>

          <TouchableOpacity
            className="flex-row space-x-2 bg-primary-500 w-full py-3 justify-center items-center rounded-md mt-5"
            onPress={() => console.log()}>
            <Text
              className="text-primary-50 text-base uppercase"
              style={{fontFamily: 'Inter-SemiBold'}}>
              Edit Profile
            </Text>
            <Icon name="pencil-sharp" color="#fff" size={20} />
          </TouchableOpacity>
        </VStack>
        <View className="p-5 pb-10">
          <VStack className="space-y-2 bg-white px-4 rounded-lg border-2 border-primary-100/50">
            <ButtonB
              icon="ios-person-outline"
              text="Data Pribadi"
              onPress={() => navigate('my-profile')}
            />
            <ButtonB
              onPress={() => navigate('change-password')}
              icon="ios-key-outline"
              text="Ganti Password"
            />
            {/* <ButtonB icon="ios-tv-outline" text="Data karyawan" /> */}
            <ButtonB icon="trail-sign-outline" text="Term & Condition" />
            <ButtonB icon="shield-checkmark-outline" text="Privacy Policy" />
            <TouchableOpacity className="py-2" onPress={LogOut}>
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

        <Text
          className="text-primary-950/50 text-center py-10"
          style={{fontFamily: 'Montserrat-Bold'}}>
          Mitra Abadi Mahakam - EmpApps v{ReactNativeVersionInfo.appVersion}
        </Text>
        <View className="h-20" />
      </ScrollView>
    </Layout>
  );
};

export default Setting;
