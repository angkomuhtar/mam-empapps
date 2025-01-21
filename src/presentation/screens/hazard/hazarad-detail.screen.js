import {Text, ScrollView, Dimensions, View} from 'react-native';
import React, {useState} from 'react';
import {Avatar, HStack, VStack} from 'native-base';
import Header from '@components/navigation/header.component';
import DetailValue from '@components/detail-value.component';
import DetailImage from '@components/detail-image.component';
import Layout from '@components/layout.component';
import Loading from '@components/loading.component';
import {useGetHazardDetailsQuery} from '@slices/hazard.slice';
import moment from 'moment';

const HazardDetails = ({route}) => {
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

  const {data, isLoading} = useGetHazardDetailsQuery(id);

  if (isLoading) return <Loading />;
  return (
    <Layout>
      <VStack px={5} pt={3} className="flex-1">
        <Header
          back={true}
          title="Hazard Report Details"
          rightIcon={
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
          }
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <VStack space={3} pb={10}>
            <DetailValue
              label="nomor hazard report"
              value={data.hazard_report_number}
            />
            <DetailValue
              label="Kategori"
              value={
                data.category == 'KTA'
                  ? 'Kondisi Tidak Aman'
                  : 'Tindakan Tidak Aman'
              }
            />
            <DetailValue
              label="Lokasi Temuan"
              value={
                data.id_location == '999'
                  ? data.other_location
                  : data.location.location
              }
            />
            <DetailValue
              label="Detail Lokasi Temuan"
              value={
                data.id_location == '999'
                  ? data.other_location
                  : data.location.location
              }
            />
            <Text>Departement Terkait</Text>
            <DetailValue label="Perusahaan" value={data.company.company} />
            <DetailValue label="Project" value={data.project.name} />
            <DetailValue label="Departement" value={data.division.division} />
            <Text>Detail Laporan</Text>
            <DetailValue
              label="kondisi temuan"
              value={data.reported_condition}
            />
            <DetailValue
              label="rekomendasi tindakan"
              value={data.recomended_action}
            />
            <DetailValue
              label="Tindakan yang diambil"
              value={data.action_taken}
            />
            <DetailImage source={data.report_attachment} />
            <DetailValue label="Batas Waktu Pengerjaan" value={data.due_date} />
            {data?.hazard_action && (
              <>
                <Text>PIC</Text>
                <HStack className="items-center space-x-3 bg-white rounded-md p-2 mb-3 border border-primary-100">
                  <Avatar source={{}} size="md" />
                  <VStack>
                    <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 14}}>
                      {data.hazard_action.pic.profile.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 11,
                        marginTop: 2,
                      }}>
                      {data.hazard_action.pic.employee.nip} -{' '}
                      {data.hazard_action.pic.employee.position.position}
                    </Text>
                  </VStack>
                </HStack>
                <Text>Diawasi Oleh</Text>
                <HStack className="items-center space-x-3 bg-white rounded-md p-2 mb-3 border border-primary-100">
                  <Avatar source={{}} size="md" />
                  <VStack>
                    <Text style={{fontFamily: 'Inter-SemiBold', fontSize: 14}}>
                      {data.hazard_action.supervised_by.profile.name}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'Inter-Regular',
                        fontSize: 11,
                        marginTop: 2,
                      }}>
                      {data.hazard_action.supervised_by.employee.nip} -{' '}
                      {
                        data.hazard_action.supervised_by.employee.position
                          .position
                      }
                    </Text>
                  </VStack>
                </HStack>
              </>
            )}

            {data?.status == 'CLOSED' && (
              <>
                <Text>Tindakan Perbaikan</Text>
                <DetailValue
                  label="Status Perbaikan"
                  value={data.hazard_action.status}
                />
                <DetailImage source={data.hazard_action.attachment} />
                <DetailValue
                  label="Tanggal Selesai"
                  value={moment(data.hazard_action.updated_at).format(
                    'YYYY-MM-DD',
                  )}
                />
                <DetailValue
                  label="Keterangan"
                  value={data?.hazard_action?.notes ?? '-'}
                />
              </>
            )}
          </VStack>
        </ScrollView>
      </VStack>
    </Layout>
  );
};

export default HazardDetails;
