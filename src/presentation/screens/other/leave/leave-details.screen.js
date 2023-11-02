import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Image,
  Pressable,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Avatar, Button, HStack, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import {goBack} from '@utils/RootNavigation';
import moment from 'moment';
import DetailValue from '@components/detail-value.component';
import ImageViewer from 'react-native-image-zoom-viewer';
import DetailImage from '@components/detail-image.component';
import Layout from '@components/layout.component';

const LeaveDetails = ({route}) => {
  const height = Dimensions.get('screen').height;
  const {reviewer} = route.params;

  return (
    <Layout>
      <VStack className="min-h-screen px-5">
        <Header
          back={
            <HStack alignItems={'center'} space={3}>
              <TouchableOpacity onPress={() => goBack()}>
                <Icon
                  name="chevron-back-outline"
                  color={'rgb(73, 6, 9)'}
                  size={30}
                />
              </TouchableOpacity>
              <Text
                className="text-xl text-primary-950"
                style={{fontFamily: 'Inter-Bold'}}>
                Detail
              </Text>
            </HStack>
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack
            space={5}
            flex={1}
            style={{minHeight: height - height * 0.32}}>
            {reviewer ? (
              <>
                <HStack className="space-x-3 bg-white rounded-md p-5 border border-primary-100">
                  <Avatar size="lg">MM</Avatar>
                  <View className="justify-center">
                    <Text
                      style={{fontFamily: 'Inter-SemiBold'}}
                      className="text-lg capitalize  text-primary-950">
                      Lesley AlexaNDER
                    </Text>
                    <Text
                      style={{fontFamily: 'Inter-Light'}}
                      className="text-md capitalize mb-2 text-primary-950">
                      PENGRAJIN KAYU
                    </Text>
                  </View>
                </HStack>
              </>
            ) : (
              <></>
            )}

            <DetailValue label="Jenis Ijin/Cuti" value={'Cuti Tahunan'} />
            <DetailValue
              label="Tanggal"
              value={[
                moment().format('ddd, DD MMM YY'),
                moment().add(12, 'days').format('ddd, DD MMM YY'),
              ]}
            />
            <DetailValue label="lama ijin/Cuti" value={'12 Hari'} />
            <DetailValue
              label="Penanggung jawab penngganti"
              value={'Harry Oxborn'}
            />
            <DetailValue
              label="catatan"
              value={'Pengen Liburan ke maldives bareng keluarga bla bla bla '}
            />
            <DetailImage
              source={require('../../../assets/images/avatar.png')}
            />
          </VStack>
          <VStack py={5} space={3} pb={32}>
            {reviewer ? (
              <HStack space={3}>
                <TouchableOpacity className="bg-primary-200 p-4 items-center rounded-md flex-1">
                  <Text
                    className="text-primary-950 text-base uppercase"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    tolak
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-primary-500 p-4 items-center rounded-md flex-1">
                  <Text
                    className="text-base text-white uppercase"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    Setujui
                  </Text>
                </TouchableOpacity>
              </HStack>
            ) : (
              <>
                <TouchableOpacity className="bg-primary-500 p-4 items-center rounded-md">
                  <Text
                    className="text-base text-white"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    Kirim Notifikasi
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity className="bg-primary-200 p-4 items-center rounded-md">
                  <Text
                    className="text-primary-950 text-base"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    Batalkan Pengajuan
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default LeaveDetails;
