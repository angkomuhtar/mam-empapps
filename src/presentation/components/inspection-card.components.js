import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider, HStack, VStack} from 'native-base';
import moment from 'moment';

export const InspectionCard = ({data, onPress, type}) => {
  return (
    <TouchableOpacity
      className="py-2 px-4 border border-primary-100 rounded-lg"
      onPress={onPress}>
      <HStack className="py-1.5 items-center justify-between">
        <View className="flex-1">
          <Text
            className="text-xs text-primary-950"
            style={{fontFamily: 'OpenSans-ExtraBold'}}>
            Inspeksi {data?.inspection.inspection_name}
          </Text>
          <Text
            className="text-[9px] text-primary-950 mt-0.5"
            style={{fontFamily: 'Inter-Bold'}}>
            {data.inspection_number}
          </Text>
        </View>
        <Text
          className="text-[11px] text-primary-950"
          style={{fontFamily: 'OpenSans-Regular'}}>
          {data.created_at != null ?? moment(data.created_at).fromNow(true)}
        </Text>
      </HStack>
      <Divider />
      <HStack className="justify-between py-2 space-x-3 my-2">
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2 text-primary-950"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Lokasi
          </Text>
          <Text
            className="text-xs text-primary-950"
            style={{fontFamily: 'Inter-ExtraBold'}}>
            {data?.location_id == '999'
              ? data?.other_location
              : data?.location?.location}
          </Text>
        </VStack>
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2 text-primary-950"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Tgl Inspeksi
          </Text>
          <Text
            className="text-xs text-primary-950"
            style={{fontFamily: 'Inter-Bold'}}>
            {moment(data.inspection_date).format('DD MMM YYYY')}
          </Text>
        </VStack>
        <VStack className="flex-1 items-start">
          <Text
            className="text-xs mb-2 text-primary-950"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Status
          </Text>

          <View
            className={`py-1 px-3 ${
              data.status == 'created' ? 'bg-yellow-500' : 'bg-green-500'
            } rounded-sm text-white`}>
            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Inter-ExtraBold'}}>
              {data.status}
            </Text>
          </View>
        </VStack>
      </HStack>
      {type == 'reviewer' && (
        <>
          <Divider />
          <HStack className="py-2 justify-between items-center">
            <VStack className="flex-1">
              <Text
                className="text-[10px] text-primary-950"
                style={{fontFamily: 'OpenSans-Reguler'}}>
                Pelapor : {data?.creator.name}
              </Text>
              <Text
                className="text-[10px] text-primary-950"
                style={{fontFamily: 'OpenSans-Reguler'}}>
                Departement : {data?.creator.division}
              </Text>
            </VStack>
          </HStack>
        </>
      )}
    </TouchableOpacity>
  );
};
