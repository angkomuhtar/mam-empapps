import {Text, ScrollView} from 'react-native';
import React from 'react';
import Layout from '@components/layout.component';
import {VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import Icon from 'react-native-vector-icons/Ionicons';
import {navigate} from '@utils/RootNavigation';
import {useGetHazardReportCountQuery} from '@slices/hazard.slice';
import ButtonList from '../../components/button-list.components';
import {useGetInspectionCountQuery} from '@slices/inspection.slice';

const RequestScreen = () => {
  const {data: countHazard, isLoading} = useGetHazardReportCountQuery();
  const {data: countInspect} = useGetInspectionCountQuery();
  return (
    <Layout>
      <VStack px={5} pt={2} className="flex-1">
        <Header back={true} title="Pengajuan & Laporan" />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} className="space-y-3">
            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-primary-950">
              Laporan
            </Text>
            <ButtonList
              title="Hazard Report"
              icon={
                <Icon
                  name="briefcase-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              pills={countHazard}
              onPress={() => {
                navigate('hazard-report');
              }}
            />
            <ButtonList
              title="Kartu Inspeksi"
              icon={
                <Icon
                  name="briefcase-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              pills={countInspect}
              onPress={() => {
                navigate('inspection-report');
              }}
            />

            <Text
              style={{fontFamily: 'Inter-Medium'}}
              className="text-primary-950">
              Pengajuan
            </Text>
            <ButtonList
              title="Pengajuan Cuti / Izin"
              icon={
                <Icon
                  name="briefcase-outline"
                  size={20}
                  color={'rgb(73, 6, 9)'}
                />
              }
              onPress={() => {
                alert('Under Construction');
              }}
            />
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default RequestScreen;
