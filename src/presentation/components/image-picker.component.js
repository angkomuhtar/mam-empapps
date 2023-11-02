import {View, Text, Image} from 'react-native';
import React, {useState} from 'react';
import {HStack, Pressable, VStack} from 'native-base';
import {launchImageLibrary} from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Ionicons';

const ImagePicker = ({onChange, onDelete}) => {
  const [selectedImage, setSelectedImage] = useState('');

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        onChange(imageUri);
        setSelectedImage(imageUri);
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
          {selectedImage ? (
            <View className="relative">
              <Image
                source={{uri: selectedImage}}
                style={{flex: 1}}
                resizeMode="cover"
                className="h-40 aspect-[5/3]"
              />
              <Pressable
                className="border border-primary-500 bg-white p-2 rounded-full self-center mt-5"
                onPress={openImagePicker}>
                <Icon
                  name="camera-reverse-sharp"
                  size={25}
                  color={'rgb(251, 54, 64)'}
                />
              </Pressable>
              <Pressable
                className="absolute -top-4 -right-4 border border-primary-500 bg-white p-2 rounded-full"
                onPress={() => {
                  setSelectedImage(null);
                  onDelete(null);
                }}>
                <Icon name="close" size={15} color={'rgb(251, 54, 64)'} />
              </Pressable>
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
