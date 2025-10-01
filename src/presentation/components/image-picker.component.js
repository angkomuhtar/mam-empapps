import {
  View,
  Text,
  Image,
  PermissionsAndroid,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {HStack, Pressable, VStack} from 'native-base';
import Picker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  request,
  PERMISSIONS,
  RESULTS,
  requestMultiple,
} from 'react-native-permissions';

const requestPermission = async () => {
  try {
    if (Platform.OS == 'ios') {
      const status = await requestMultiple([
        PERMISSIONS.IOS.PHOTO_LIBRARY,
        PERMISSIONS.IOS.CAMERA,
      ]);
      if (status === RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } else {
      const granted = await PermissionsAndroid.requestMultiple(
        [
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.CAMERA,
        ],
        {
          title: 'Foto library',
          message: 'Can we access foto library.?',
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
const ImagePicker = ({
  onChange,
  onDelete,
  value,
  type = 'library',
  error = null,
  label = 'Lampiran File',
  crop = false,
}) => {
  const [selectedImage, setSelectedImage] = useState('');
  const [visible, setVisible] = useState(false);

  const openImagePicker = pickType => {
    const permission = requestPermission();
    permission.then(() => {
      const option = {
        width: 800,
        height: 1000,
        cropping: true,
        freeStyleCropEnabled: crop,
      };

      if (pickType == 'library') {
        Picker.openPicker(option)
          .then(response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              onChange(response);
            }
          })
          .catch(res => {
            console.log(res);
          })
          .finally(() => {
            setVisible(false);
          });
      } else if (pickType == 'camera') {
        Picker.openCamera(option)
          .then(response => {
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              onChange(response);
            }
          })
          .catch(res => {
            console.log(res);
          })
          .finally(() => {
            setVisible(false);
          });
      }
    });
  };
  return (
    <View className="flex-1">
      <Modal transparent={true} visible={visible} animationType="fade">
        <VStack className="absolute h-screen w-full bg-black/50 items-center justify-center">
          <VStack className="bg-white px-3 py-4 rounded-xl w-3/5 relative">
            <TouchableOpacity
              className="absolute z-20 top-2 right-2"
              onPress={() => {
                setVisible(false);
              }}>
              <Icon name="close" size={25} color={'rgb(251, 54, 64)'} />
            </TouchableOpacity>
            <Text
              style={{fontFamily: 'Inter-SemiBold'}}
              className="text-[12px] text-center text-primary-950 uppercase">
              Pilih Sumber Gambar
            </Text>
            <HStack className="pt-2 space-x-3 justify-center">
              <TouchableOpacity
                onPress={() => {
                  openImagePicker('camera');
                }}
                className="p-2 items-center">
                <Icon name="camera" size={30} color={'rgb(251, 54, 64)'} />
                <Text
                  style={{fontFamily: 'OpenSans-Regular'}}
                  className="text-primary-500 text-xs pt-1">
                  Camera
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  openImagePicker('library');
                }}
                className="p-2 items-center">
                <Icon name="images" size={30} color={'rgb(251, 54, 64)'} />
                <Text
                  style={{fontFamily: 'OpenSans-Regular'}}
                  className="text-primary-500 text-xs pt-1">
                  Library
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </VStack>
      </Modal>
      <HStack className="border border-primary-100 bg-white py-2 px-4 rounded-md">
        <VStack className="flex-1">
          <Text
            className="text-xs text-primary-950 capitalize"
            style={{fontFamily: 'Inter-Regular'}}>
            {label}
          </Text>
          <HStack className="items-center justify-center p-5">
            {value ? (
              <View className="relative">
                <Image
                  source={{uri: value.path}}
                  style={{
                    width: 250,
                    height: 250,
                  }}
                  resizeMode="contain"
                />
                <HStack space={5} className="justify-center items-center mt-5">
                  <Pressable
                    className="border border-primary-500 bg-white p-2 rounded-full"
                    onPress={() => {
                      type == 'both' ? setVisible(true) : openImagePicker(type);
                    }}>
                    <Icon
                      name="camera-reverse-sharp"
                      size={20}
                      color={'rgb(251, 54, 64)'}
                    />
                  </Pressable>
                  <Pressable
                    className="border border-primary-500 bg-white p-2 rounded-full"
                    onPress={() => {
                      setSelectedImage(null);
                      onDelete(null);
                    }}>
                    <Icon name="close" size={20} color={'rgb(251, 54, 64)'} />
                  </Pressable>
                </HStack>
              </View>
            ) : (
              <Pressable
                onPress={() => {
                  type == 'both' ? setVisible(true) : openImagePicker(type);
                }}>
                <Icon name="camera" size={35} color={'rgb(73, 6, 9)'} />
              </Pressable>
            )}
          </HStack>
        </VStack>
        <View className="justify-center items-center"></View>
      </HStack>
      {error && (
        <Text
          className="text-primary-500 capitalize text-[11px] ml-2 mt-2"
          style={{fontFamily: 'Inter-Medium'}}>
          {error?.message}
        </Text>
      )}
    </View>
  );
};

export default ImagePicker;
