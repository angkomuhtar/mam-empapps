import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const Alert = ({visible, onOk, onDissmiss, type, message, title, quote}) => {
  let alertType = '';
  switch (type) {
    case 'warning':
      alertType = {
        icon: require('../assets/images/warning.json'),
      };
      break;
    case 'success':
      alertType = {
        icon: require('../assets/images/success.json'),
      };
      break;
    case 'error':
      alertType = {
        icon: require('../assets/images/error.json'),
      };
      break;
    default:
      alertType = {
        icon: require('../assets/images/success.json'),
      };
      break;
  }

  return (
    <Modal transparent={true} visible={visible}>
      <VStack className="absolute h-full w-full bg-black/50 items-center justify-center">
        <VStack className="bg-white p-5 rounded-xl w-3/4 relative space-y-3">
          <View className="rounded-full p-5 bg-primary-50 self-center">
            <View className="rounded-full p-2 bg-primary-200 self-center">
              <LottieView
                source={alertType.icon}
                loop
                autoPlay
                style={{height: 100, width: 100}}
              />
            </View>
          </View>
          <Text
            style={{fontFamily: 'Inter-SemiBold'}}
            className="text-lg text-center text-primary-950 mt-3 uppercase">
            {title}
          </Text>
          {message && (
            <Text
              style={{fontFamily: 'Inter-Regular'}}
              className="text-sm text-center text-primary-950 uppercase">
              {message}
            </Text>
          )}

          {quote && (
            <Text
              style={{fontFamily: 'Roboto-Regular'}}
              className="text-sm text-center text-primary-950 italic">
              {quote}
            </Text>
          )}
          <HStack className="pt-4 space-x-3">
            <TouchableOpacity
              onPress={onOk}
              className="flex-1 bg-primary-500 p-4 rounded-md items-center">
              <Text style={{fontFamily: 'Inter-Bold'}} className="text-white">
                Oke
              </Text>
            </TouchableOpacity>
            {onDissmiss && (
              <TouchableOpacity
                onPress={onDissmiss}
                className="flex-1 border border-primary-500 p-4 rounded-md items-center">
                <Text
                  style={{fontFamily: 'Inter-Bold'}}
                  className="text-primary-500">
                  Batal
                </Text>
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default Alert;
