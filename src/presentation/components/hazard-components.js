import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {Divider, HStack, VStack} from 'native-base';
import moment from 'moment';
import {navigate} from '@utils/RootNavigation';

export const HazardCard = ({data, onPress}) => {
  return (
    <TouchableOpacity
      className="py-2 px-4 border border-primary-100 rounded-lg"
      onPress={onPress}>
      <HStack className="py-1.5 items-center justify-between">
        <View className="flex-1">
          <Text className="text-xs" style={{fontFamily: 'OpenSans-ExtraBold'}}>
            {data?.id_location == '999'
              ? data?.other_location
              : data?.location.location}
          </Text>
          <Text
            className="text-[9px] text-primary-950"
            style={{fontFamily: 'Inter-Bold'}}>
            {data.hazard_report_number}
          </Text>
        </View>
        <Text
          className="text-xs text-primary-950"
          style={{fontFamily: 'Inter-Bold'}}>
          {data.division.division}
        </Text>
      </HStack>
      <Divider />
      <HStack className="justify-between py-2 space-x-3 my-2">
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            kategori
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-ExtraBold'}}>
            {data.category === 'KTA'
              ? 'Kondisi Tidak Aman'
              : 'Tindakan Tidak Aman'}
          </Text>
        </VStack>
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Due date
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-Bold'}}>
            {moment(data.due_date).format('dddd, DD MMM YYYY')}
          </Text>
        </VStack>
        <VStack className="flex-1 items-start">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Status
          </Text>

          <View
            className={`py-1 px-3 ${
              data.status == 'OPEN'
                ? 'bg-red-500'
                : data.status == 'ONPROGRESS'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            } rounded-sm text-white`}>
            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Inter-ExtraBold'}}>
              {data.status}
            </Text>
          </View>
        </VStack>
      </HStack>
      <Divider />
      <HStack className="py-2 justify-end items-center">
        <Text
          className="text-[11px] text-primary-950"
          style={{fontFamily: 'OpenSans-Regular'}}>
          {moment(data.date_time).fromNow(true)}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export const HazardReportCard = ({data, onPress}) => {
  return (
    <TouchableOpacity
      className="py-2 px-4 border border-primary-100 rounded-lg"
      onPress={onPress}>
      <HStack className="py-1.5 items-center justify-between">
        <View className="flex-1">
          <Text className="text-xs" style={{fontFamily: 'OpenSans-ExtraBold'}}>
            {data?.id_location == '999'
              ? data?.other_location
              : data?.location.location}
          </Text>
          <Text
            className="text-[9px] text-primary-950"
            style={{fontFamily: 'Inter-Bold'}}>
            {data.hazard_report_number}
          </Text>
        </View>
        <Text
          className="text-[9px] text-primary-950"
          style={{fontFamily: 'Inter-Bold'}}>
          {data.division.division}
        </Text>
      </HStack>
      <Divider />
      <HStack className="justify-between py-2 space-x-3 my-2">
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            kategori
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-ExtraBold'}}>
            {data.category === 'KTA'
              ? 'Kondisi Tidak Aman'
              : 'Tindakan Tidak Aman'}
          </Text>
        </VStack>
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Due date
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-Bold'}}>
            {moment(data.due_date).format('dddd, DD MMM YYYY')}
          </Text>
        </VStack>
        <VStack className="flex-1 items-start">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Status
          </Text>

          <View
            className={`py-1 px-3 ${
              data.status == 'OPEN'
                ? 'bg-red-500'
                : data.status == 'ONPROGRESS'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            } rounded-sm text-white`}>
            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Inter-ExtraBold'}}>
              {data.status}
            </Text>
          </View>
        </VStack>
      </HStack>
      <Divider />
      <HStack className="py-2 justify-between items-center">
        <VStack className="flex-1">
          <Text
            className="text-[10px] text-primary-950"
            style={{fontFamily: 'OpenSans-Reguler'}}>
            Pelapor : {data?.created_by.profile.name}
          </Text>
          <Text
            className="text-[10px] text-primary-950"
            style={{fontFamily: 'OpenSans-Reguler'}}>
            Departement : {data?.created_by.employee.division.division}
          </Text>
        </VStack>
        <Text
          className="text-[11px] text-primary-950"
          style={{fontFamily: 'OpenSans-Regular'}}>
          {moment(data.date_time).fromNow(true)}
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export const HazardActionCard = ({data, onPress}) => {
  return (
    <TouchableOpacity
      className="py-2 px-4 border border-primary-100 rounded-lg bg-white"
      onPress={onPress}>
      <HStack className="py-1.5 items-center justify-between">
        <View className="flex-1">
          <Text className="text-xs" style={{fontFamily: 'OpenSans-ExtraBold'}}>
            {data?.id_location == '999'
              ? data?.other_location
              : data?.location.location}
          </Text>
          <Text
            className="text-[9px] text-primary-950"
            style={{fontFamily: 'Inter-Bold'}}>
            {data.hazard_report_number}
          </Text>
        </View>
        <Text
          className="text-[9px] text-primary-950"
          style={{fontFamily: 'Inter-Bold'}}>
          {moment(data.date_time).fromNow(true)}
        </Text>
      </HStack>
      <Divider />
      <HStack className="justify-between py-2 space-x-3 my-2">
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            kategori
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-ExtraBold'}}>
            {data.category === 'KTA'
              ? 'Kondisi Tidak Aman'
              : 'Tindakan Tidak Aman'}
          </Text>
        </VStack>
        <VStack className="flex-1">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Due date
          </Text>
          <Text className="text-xs" style={{fontFamily: 'Inter-Bold'}}>
            {moment(data.due_date).format('dddd, DD MMM YYYY')}
          </Text>
        </VStack>
        <VStack className="flex-1 items-start">
          <Text
            className="text-xs mb-2"
            style={{fontFamily: 'OpenSans-Regular'}}>
            Status
          </Text>

          <View
            className={`py-1 px-3 ${
              data.status == 'OPEN'
                ? 'bg-red-500'
                : data.status == 'ONPROGRESS'
                ? 'bg-yellow-500'
                : 'bg-green-500'
            } rounded-sm text-white`}>
            <Text
              className="text-[10px] text-white"
              style={{fontFamily: 'Inter-ExtraBold'}}>
              {data.status}
            </Text>
          </View>
        </VStack>
      </HStack>
      <Divider />
      <HStack className="py-2 justify-between items-center">
        <VStack className="flex-1">
          <Text
            className="text-[10px] text-primary-950"
            style={{fontFamily: 'OpenSans-Reguler'}}>
            Pelapor : {data?.created_by.profile.name}
          </Text>
          <Text
            className="text-[10px] text-primary-950"
            style={{fontFamily: 'OpenSans-Reguler'}}>
            Departement : {data?.created_by.employee.division.division}
          </Text>
        </VStack>
      </HStack>
    </TouchableOpacity>
  );
};

export const ErrorMessage = ({value}) => (
  <Text
    className="text-primary-500 capitalize ml-1 mt-1 text-[10px]"
    style={{fontFamily: 'Inter-Medium'}}>
    {value}
  </Text>
);
