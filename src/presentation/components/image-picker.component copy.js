import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {HStack, Pressable, VStack} from 'native-base';
// import {launchImageLibrary} from 'react-native-image-picker';
import Picker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/Ionicons';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

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
const ImagePicker = ({onChange, onDelete, value}) => {
  const [selectedImage, setSelectedImage] = useState('');

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

      Picker.openPicker({
        width: 800,
        height: 1200,
        cropping: true,
        // cropperCircleOverlay: true,
      }).then(response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          console.log({response});
          onChange(response);
          // setSelectedImage(response.path);
        }
      });
    });
  };

  const handleCameraLaunch = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled camera');
      } else if (response.error) {
        console.log('Camera Error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        setSelectedImage(imageUri);
        console.log(imageUri);
      }
    });
  };
  return (
    <HStack className="border border-primary-100 bg-white py-2 px-4 rounded-md">
      <VStack className="flex-1">
        <Text
          className="text-xs text-primary-950 capitalize"
          style={{fontFamily: 'Inter-Regular'}}>
          lampiran File
        </Text>
        <HStack className="items-center justify-center p-5">
          {value ? (
            <View className="relative">
              <Image
                source={{uri: value.path}}
                style={{flex: 1}}
                resizeMode="contain"
                className="w-40 aspect-[3/5]"
              />
              <HStack space={5} className="justify-center items-center mt-5">
                <Pressable
                  className="border border-primary-500 bg-white p-2 rounded-full"
                  onPress={openImagePicker}>
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
            <Pressable onPress={openImagePicker}>
              <Icon name="camera" size={35} color={'rgb(73, 6, 9)'} />
            </Pressable>
          )}
        </HStack>
      </VStack>
      <View className="justify-center items-center"></View>
    </HStack>
  );
};

export default ImagePicker;
