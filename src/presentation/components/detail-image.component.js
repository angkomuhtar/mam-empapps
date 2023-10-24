import {View, Text, Pressable, Modal, Image, Platform} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import ImageViewer from 'react-native-image-zoom-viewer';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailImage = ({source}) => {
  const [viewImage, setViewImage] = useState(false);

  const images = [
    {
      url: '',
      props: {
        source: source,
      },
    },
  ];

  return (
    <VStack space={2}>
      <Text
        className="text-md text-primary-950 capitalize"
        style={{fontFamily: 'Inter-Light'}}>
        Attachment
      </Text>
      <View className="bg-white rounded-md p-4 justify-center items-center">
        <Pressable onPress={() => setViewImage(true)}>
          <Image resizeMode="contain" source={source} className="w-28 h-24" />
        </Pressable>
      </View>
      <Modal visible={viewImage} transparent={true}>
        <HStack
          className={`relative bg-black justify-end ${
            Platform.OS == 'ios' ? 'pt-10' : ''
          }  px-10`}>
          <Pressable onPress={() => setViewImage(false)}>
            <Icon name="close" color="#fff" size={35} />
          </Pressable>
        </HStack>
        <ImageViewer imageUrls={images} />
      </Modal>
    </VStack>
  );
};

export default DetailImage;
