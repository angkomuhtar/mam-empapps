import {View, Text, Pressable, Modal, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailImage = ({source}) => {
  const [viewImage, setViewImage] = useState(false);
  const images = [
    {
      url: source,
    },
  ];

  return (
    <VStack space={2}>
      <View className="bg-white rounded-md p-4 justify-center items-center border border-primary-100">
        <Text
          className="text-md text-primary-950 capitalize self-start"
          style={{fontFamily: 'Inter-Light'}}>
          Attachment
        </Text>
        <Pressable onPress={() => setViewImage(true)}>
          <Image
            resizeMode="contain"
            source={{uri: source}}
            className="w-full aspect-video mt-5"
          />
        </Pressable>
      </View>
      <Modal visible={viewImage} transparent={true}>
        <VStack className="relative w-full h-full">
          <HStack
            className={`relative bg-black justify-end ${
              Platform.OS == 'ios' ? 'pt-10' : ''
            } px-10`}>
            <Pressable onPress={() => setViewImage(false)}>
              <Icon name="close" color="#fff" size={35} />
            </Pressable>
          </HStack>
          <ImageViewer imageUrls={images} />
        </VStack>
      </Modal>
    </VStack>
  );
};

export default DetailImage;
