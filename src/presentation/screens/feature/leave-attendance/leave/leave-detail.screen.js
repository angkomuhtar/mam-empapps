import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import DetailValue from '@components/detail-value.component';
import Layout from '@components/layout.component';
import Loading from '@components/loading.component';
import moment from 'moment';
import _ from 'lodash';
import {useGetCutiDetailQuery} from '@slices/pkwt.slice';
import {useAlert} from '@hooks/useAlert';

const LeaveDetail = ({route}) => {
  const {id} = route.params;

  const {data, isLoading} = useGetCutiDetailQuery({id});

  if (isLoading) return <Loading />;

  return (
    <Layout>
      <VStack px={5} pt={3} className="flex-1">
        <Header
          back={true}
          title="Detail Pengajuan Cuti"
          rightIcon={
            <View className="flex-row items-center">
              <View
                className={`py-1 px-3 ${
                  data?.status == 'approved'
                    ? 'bg-green-500'
                    : data?.status == 'pending'
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                } rounded-sm text-white`}>
                <Text
                  className="text-[10px] text-white capitalize"
                  style={{fontFamily: 'Inter-ExtraBold'}}>
                  {data?.status}
                </Text>
              </View>
            </View>
          }
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} pb={10}>
            <DetailValue label="Jenis Cuti" value={data?.absence_type?.name} />
            <DetailValue
              label="mulai cuti"
              value={moment(data?.start_date).format('DD MMM YYYY')}
            />
            <DetailValue
              label="Berakhir cuti"
              value={moment(data?.end_date).format('DD MMM YYYY')}
            />
            <DetailValue
              label="Total Hari"
              value={data?.total_days + ' Hari'}
            />
            <DetailValue label="Catatan" value={data?.notes ?? '-'} />
            <Text
              className="text-sm text-black mt-4 mb-2"
              style={{fontFamily: 'OpenSans-SemiBold'}}>
              Approval
            </Text>

            {data?.approvals?.map((item, index) => {
              let label = '';
              switch (item?.role) {
                case 'admin_hr':
                  label = 'Admin HR';
                  break;
                case 'admin_dept':
                  label = 'Admin Departement';
                  break;
                case 'dept_head':
                  label = 'Kepala Departement';
                  break;
                case 'pm':
                  label = 'Project Manager';
                  break;
                case 'dept_head_hr':
                  label = 'Kepala Departement HR';
                  break;
                default:
                  label = item?.role;
                  break;
              }

              return (
                <DetailValue
                  key={index}
                  label={label}
                  icon={item?.status == 'approved'}
                  value={
                    item?.status == 'approved'
                      ? item?.approver?.name
                      : item?.status
                  }
                />
              );
            })}
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default LeaveDetail;
