import {View, Text, TouchableOpacity, Modal} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {TextMontserrat} from './Text';

const Alert = ({visible, onOk, onDissmiss, type, message, title}) => {
  let alertType = '';
  switch (type) {
    case 'warning':
      alertType = {
        icon: 'alert-circle-outline',
      };
      break;
    case 'success':
      alertType = {
        icon: 'checkmark-done-circle-outline',
      };
      break;
    case 'error':
      alertType = {
        icon: 'close-circle-outline',
      };
      break;
    default:
      alertType = {
        icon: 'checkmark-done-circle-outline',
      };
      break;
  }

  return (
    <Modal transparent={true} visible={visible}>
      <VStack className="absolute h-full w-full bg-black/50 items-center justify-center">
        <VStack className="bg-white px-5 py-9 rounded-md w-3/4 relative space-y-3">
          <View className="rounded-full p-4 absolute bg-primary-500 -top-14 border-2 border-white self-center">
            <Icon name={alertType.icon} size={60} color="#fff" />
          </View>
          <TextMontserrat
            weight="Bold"
            class="text-lg text-center text-primary-950 my-3">
            {title}
          </TextMontserrat>
          <TextMontserrat
            weight="Medium"
            class="text-sm text-center text-primary-950">
            {message}
          </TextMontserrat>
          <HStack className="pt-4 space-x-3">
            <TouchableOpacity
              onPress={onOk}
              className="flex-1 bg-primary-500 p-4 rounded-md items-center">
              <TextMontserrat weight="Bold" class="text-white">
                Oke
              </TextMontserrat>
            </TouchableOpacity>
            {type == 'warning' && (
              <TouchableOpacity
                onPress={onDissmiss}
                className="flex-1 border border-primary-500 p-4 rounded-md items-center">
                <TextMontserrat weight="Bold" class="text-primary-500">
                  Cancel
                </TextMontserrat>
              </TouchableOpacity>
            )}
          </HStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default Alert;
