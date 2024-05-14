import {View, Text, TouchableOpacity, Modal, TextInput} from 'react-native';
import React, {useState} from 'react';
import {HStack, VStack} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';

const Alert = ({
  visible,
  onOk,
  onDissmiss,
  type,
  message,
  title,
  quote,
  onChangeText,
  errText = false,
}) => {
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
    case 'danger':
      alertType = {
        icon: require('../assets/images/robot.json'),
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
      <VStack className="absolute h-screen w-full bg-black/50 items-center justify-center">
        <VStack className="bg-white p-3 rounded-xl w-3/4 relative">
          {type != 'danger' ? (
            <View className="rounded-full p-3 bg-primary-50 self-center">
              <View className="rounded-full p-3 bg-primary-200 self-center">
                <LottieView
                  source={alertType.icon}
                  loop
                  autoPlay
                  style={{height: 70, width: 70}}
                />
              </View>
            </View>
          ) : (
            <View className="rounded-full self-center relative h-36">
              <LottieView
                source={alertType.icon}
                loop
                autoPlay
                className="-top-20 absoute"
                style={{height: 250, width: 250}}
              />
            </View>
          )}

          <VStack mb={5} space={1} mt={3}>
            <Text
              style={{fontFamily: 'Inter-Bold'}}
              className="text-sm text-center text-primary-950 uppercase">
              {title}
            </Text>
            {message && (
              <Text
                style={{fontFamily: 'Inter-Regular'}}
                className="text-xs text-center text-primary-950 capitalize">
                {message}
              </Text>
            )}

            {quote && (
              <Text
                style={{fontFamily: 'Roboto-Regular'}}
                className="text-xs text-center text-primary-950 italic">
                {quote}
              </Text>
            )}
            {onChangeText && (
              <>
                <HStack className="border border-primary-100 py-2 px-4 rounded-md bg-white mt-4">
                  <VStack className="flex-1">
                    <Text
                      className="text-xs text-primary-950 capitalize"
                      style={{fontFamily: 'OpenSans-Regular'}}>
                      catatan
                    </Text>
                    <TextInput
                      multiline={true}
                      placeholder="Catatan untuk requestor"
                      autoComplete="off"
                      onChangeText={onChangeText}
                      className={`${
                        Platform.OS == 'ios' ? 'py-2' : 'py-0'
                      } text-primary-950 text-xs h-12`}
                      style={{fontFamily: 'OpenSans-Light'}}
                    />
                  </VStack>
                </HStack>
                {errText && (
                  <Text
                    style={{fontFamily: 'OpenSans-MediumItalic'}}
                    className="text-xs text-primary-500 pt-2 italic">
                    Tidak Boleh Kosong
                  </Text>
                )}
              </>
            )}
          </VStack>
          <HStack className="pt-4 space-x-3">
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
            <TouchableOpacity
              onPress={onOk}
              className="flex-1 bg-primary-500 p-4 rounded-md items-center">
              <Text style={{fontFamily: 'Inter-Bold'}} className="text-white">
                Oke
              </Text>
            </TouchableOpacity>
          </HStack>
        </VStack>
      </VStack>
    </Modal>
  );
};

export default Alert;
