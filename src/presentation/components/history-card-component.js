import {View, Text} from 'react-native';
import React from 'react';
import moment from 'moment';
import Icon from 'react-native-vector-icons/Ionicons';
import {HStack} from 'native-base';

const HistoryCard = ({date, checkin, checkout, status}) => {
  return (
    <View className="flex-row items-center bg-white rounded-md border border-primary-100 mb-2">
      <View
        className={`items-center ${
          status == 'H' ? 'bg-green-400' : 'bg-gray-400'
        } px-1 rounded-l-md h-full`}
      />
      <View className="flex-1 px-3 py-4">
        <HStack className="justify-between">
          <Text
            style={{fontFamily: 'Inter-ExtraBold'}}
            className="text-md text-primary-950">
            {moment(date, 'YYYY-MM-DD').format('MMMM DD, YYYY')}
          </Text>

          <Text
            style={{fontFamily: 'Inter-Light'}}
            className="text-md text-primary-950">
            {moment(date, 'YYYY-MM-DD').format('dddd')}
          </Text>
        </HStack>
        <HStack className="space-x-8 mt-4">
          <HStack className="items-center space-x-2 flex-1">
            {status == 'H' ? (
              <>
                <View className="rounded-md p-[4px] bg-green-400">
                  <Icon name="enter-outline" size={18} color="#FFF" />
                </View>
                <Text
                  className="text-primary-950 text-md"
                  style={{fontFamily: 'Inter-SemiBold'}}>
                  {checkin
                    ? moment(checkin, 'HH:mm:ss').locale('en').format('hh:mm a')
                    : '--:-- --'}
                </Text>
              </>
            ) : (
              <>
                <View className="rounded-md p-[4px] bg-gray-400">
                  <Icon name="reader-outline" size={18} color="#FFF" />
                </View>
                <Text
                  className="text-primary-950 text-md"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Libur
                </Text>
              </>
            )}
          </HStack>
          <HStack className="items-center space-x-2 flex-1">
            {status == 'H' ? (
              <>
                <View className="rounded-md p-[4px] bg-green-400">
                  <Icon name="exit-outline" size={18} color="#FFF" />
                </View>
                <Text
                  className="text-primary-950 text-md"
                  style={{fontFamily: 'Inter-SemiBold'}}>
                  {checkout
                    ? moment(checkout, 'HH:mm:ss')
                        .locale('en')
                        .format('hh:mm a')
                    : '--:-- --'}
                </Text>
              </>
            ) : (
              <>
                <View className="rounded-md p-[4px] bg-gray-400">
                  <Icon name="calendar-outline" size={18} color="#FFF" />
                </View>
                <Text
                  className="text-primary-950 text-sm"
                  style={{fontFamily: 'Inter-Bold'}}>
                  Maulid Nabi
                </Text>
              </>
            )}
          </HStack>
        </HStack>
        {/* <View className="items-center space-y-1 py-4">
          <Text
            className="text-gray-500 text-xs"
            style={{fontFamily: 'OpenSans-ExtraBold'}}>
            Datang
          </Text>
          <Text
            style={{fontFamily: 'OpenSans-Bold'}}
            className="text-2xl text-primary-950">
            {checkin ? moment(checkin, 'HH:mm:ss').format('HH:mm') : '--:--'}
          </Text>
        </View>
        <View className="items-center space-y-1 flex-1">
          <Text
            className="text-gray-500 text-xs"
            style={{fontFamily: 'OpenSans-ExtraBold'}}>
            Pulang
          </Text>
          <Text
            style={{fontFamily: 'OpenSans-Bold'}}
            className="text-2xl text-primary-950">
            {checkout ? moment(checkout, 'HH:mm:ss').format('HH:mm') : '--:--'}
          </Text>
        </View> */}

        {/* <View className="items-center justify-center p-2 rounded-md">
          <Ion
            name="checkmark-done-circle"
            color={'rgb(34 197 94)'}
            size={20}
          />
          <Text
            style={{fontFamily: 'OpenSans-ExtraBold'}}
            className="text-xs text-green-500">
            Hadir
          </Text>
        </View> */}
      </View>
    </View>
  );
};

export default HistoryCard;
