import {Text, ScrollView, View, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Button, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import DetailValue from '@components/detail-value.component';
import Layout from '@components/layout.component';
import Loading from '@components/loading.component';
import moment from 'moment';
import {useGetInspectDetailQuery} from '@slices/inspection.slice';
import _ from 'lodash';

const InspectionDetail = ({route}) => {
  const {id, type} = route.params;
  const [alert, setAlert] = useState({
    show: false,
    type: 'success',
    title: 'Pengajuan dibatalkan',
    message: 'Pengajuan Anda telah dibatalkan',
    quote: '',
    onOK: () => {
      setAlert({...alert, show: false});
    },
    onDissmiss: false,
  });

  const {data, isLoading} = useGetInspectDetailQuery({id});
  const [subItem, setSubItem] = useState('');

  const grouped = _.groupBy(
    data?.answer,
    item => item?.question?.sub_inspection?.sub_inspection_name || 'Unknown',
  );

  const sections = Object.entries(grouped).map(([key, items]) => ({
    title: key,
    data: items,
  }));

  if (isLoading) return <Loading />;
  return (
    <Layout>
      <VStack px={5} pt={3} className="flex-1">
        <Header
          back={true}
          title="Inspection Card Detail"
          rightIcon={
            <View
              className={`py-1 px-3 ${
                data?.status == 'OPEN'
                  ? 'bg-red-500'
                  : data?.status == 'ONPROGRESS'
                  ? 'bg-yellow-500'
                  : 'bg-green-500'
              } rounded-sm text-white`}>
              <Text
                className="text-[10px] text-white"
                style={{fontFamily: 'Inter-ExtraBold'}}>
                {data?.status}
              </Text>
            </View>
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} pb={10}>
            <DetailValue
              label="nomor hazard report"
              value={data?.inspection_number}
            />
            <DetailValue
              label="Nama Pengawas"
              value={data?.creator?.profile.name}
            />
            <DetailValue
              label="Jabatan Pengawas"
              value={data?.creator?.employee?.position?.position}
            />
            <DetailValue
              label="NRP Pengawas"
              value={data?.creator?.employee?.nip}
            />
            <DetailValue
              label="tanggal inspeksi"
              value={moment(data?.inspection_date).format('DD MMM YYYY')}
            />
            <DetailValue
              label="Lokasi"
              value={
                data?.location_id !== '999'
                  ? data?.location?.location
                  : data.other_location
              }
            />
            <DetailValue label="Detail Lokasi" value={data.detail_location} />
            <DetailValue
              label="Catatan Inspeksi"
              value={data.recomended_action}
            />

            {sections.map((section, index) => {
              return (
                <VStack key={index} space={2}>
                  <Text
                    style={{fontFamily: 'Inter-Medium'}}
                    className="text-primary-950">
                    {section.title}
                  </Text>
                  {section.data.map(item => {
                    if (item?.answer == 'yes') {
                      return (
                        <DetailValue
                          key={item.id}
                          label={item.question.question}
                          value="Sesuai"
                        />
                      );
                    } else if (item?.answer == 'no') {
                      return (
                        <VStack key={item.id} space={1}>
                          <DetailValue
                            label={item.question.question}
                            value="Tidak Sesuai"
                          />
                          <VStack space={1} px={2}>
                            <DetailValue
                              label="Tindakan Perbaikan"
                              value={item.note}
                            />
                            <DetailValue
                              label="Due Date"
                              value={moment(item.due_date).format('DD MMM YY')}
                            />
                          </VStack>
                        </VStack>
                      );
                    }
                  })}
                </VStack>
              );
            })}
            {/* 
            {data?.answer.map(answer => {
              console.log(subItem);

              if (answer?.answer == 'yes') {
                return (
                  <>
                    {subItem != answer?.question?.sub_inspection_id && (
                      <Text>
                        {answer?.question?.sub_inspection?.sub_inspection_name}
                        {subItem}
                      </Text>
                    )}
                    <DetailValue
                      key={answer.id}
                      label={answer.question.question}
                      value="Sesuai"
                    />
                  </>
                );
              } else if (answer?.answer == 'no') {
                return (
                  <VStack key={answer.id} space={1}>
                    <DetailValue
                      key={answer.id}
                      label={answer.question.question}
                      value="Tidak Sesuai"
                    />
                    <DetailValue
                      label="Tindakan Perbaikan"
                      value={answer.note}
                    />
                    <DetailValue
                      label="Due Date"
                      value={moment(answer.due_date).format('DD MMM YY')}
                    />
                  </VStack>
                );
              }
              setSubItem(answer?.question?.sub_inspection_id);
            })} */}
          </VStack>
        </ScrollView>

        {type == 'reviewer' && (
          <VStack className="py-5 pb-8">
            <Button onPress={() => console.log()}>
              <Text
                className="text-white capitalize"
                style={{fontFamily: 'OpenSans-Bold'}}>
                Verifikasi Inspeksi
              </Text>
            </Button>
          </VStack>
        )}
      </VStack>
    </Layout>
  );
};

export default InspectionDetail;
