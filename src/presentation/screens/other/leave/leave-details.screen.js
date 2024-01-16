import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
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
import Status from '../../../components/status-badge.components';
import {useUpdateLeaveMutation} from '@slices/leave.slice';
import Alert from '@components/alert.component';
import RejectAlert from '@components/alert.component';
import Loading from '@components/loading.component';

const LeaveDetails = ({route}) => {
  const height = Dimensions.get('screen').height;
  const {reviewer, data} = route.params;
  const [cancelAction, {result, isLoading: cancelLoading}] =
    useUpdateLeaveMutation();
  const [note, setNote] = useState('');
  const [confirmAlert, setConfirmAlert] = useState({
    show: false,
    title: 'setujui pengajuan',
    message: '',
    onOk: () => {},
  });
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

  const updateAction = body => {
    setConfirmAlert({...confirmAlert, show: false});
    cancelAction({...body, approver_note: note}).then(({data}) => {
      if (data.success) {
        setAlert({
          show: true,
          type: 'success',
          title:
            body.status == '1' ? 'Pengajuan Disetujui' : 'Pengajuan ditolak',
          message:
            body.status == '1'
              ? 'Pengajuan telah di setujui dan akan masuk ke tahap HR review'
              : 'Pengajuan telah di batalkan',
          quote: false,
          onOK: () => {
            setAlert({show: false});
            goBack();
          },
        });
      } else {
        setAlert({
          show: true,
          type: 'error',
          title: 'Error',
          message: 'Terjadi Kesalahan',
          quote: false,
          data: {status: '', id: 0},
        });
      }
    });
  };

  return (
    // <Layout>
    <>
      <Alert
        visible={alert.show}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        quote={alert.quote}
        onOk={alert.onOK}
        onDissmiss={alert.onDissmiss}
      />
      <RejectAlert
        visible={confirmAlert.show}
        type={'warning'}
        onChangeText={text => {
          setNote(text);
        }}
        onDissmiss={() => setConfirmAlert({...confirmAlert, show: false})}
        onOk={() => {
          if (note != '') {
            updateAction(confirmAlert.data);
          }
        }}
        errText={note == '' ? true : false}
        title={confirmAlert.title}
        message={confirmAlert.message}
      />
      <VStack className="px-5 pt-8 bg-[#fafafa] flex-1">
        {cancelLoading && <Loading />}
        <ScrollView showsVerticalScrollIndicator={false}>
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
          <VStack
            space={3}
            flex={1}
            mb={5}
            style={{minHeight: height - height * 0.32}}>
            <VStack
              space={2}
              className="bg-white p-3 rounded-lg border border-primary-100">
              <Text
                className="text-md text-primary-950 capitalize"
                style={{fontFamily: 'Inter-Light'}}>
                status
              </Text>

              <View className="">
                <Status data={data.status} />
              </View>
            </VStack>
            {reviewer ? (
              <>
                <HStack className="space-x-3 bg-white rounded-md p-5 border border-primary-100">
                  <Avatar size="lg">MM</Avatar>
                  <View className="justify-center">
                    <Text
                      style={{fontFamily: 'Inter-SemiBold'}}
                      className="text-lg capitalize  text-primary-950">
                      {data?.employee_name}
                    </Text>
                    <Text
                      style={{fontFamily: 'Inter-Light'}}
                      className="text-md capitalize mb-2 text-primary-950">
                      {`${data.employee_division} - ${data.employee_position}`}
                    </Text>
                  </View>
                </HStack>
              </>
            ) : (
              <></>
            )}

            <DetailValue
              label="Jenis Ijin/Cuti"
              value={data.leave_type.value}
            />
            <DetailValue
              label="Tanggal"
              value={
                data.s_date == data.e_date
                  ? moment(data.s_date, 'YYYY-MM-DD').format('DD MMM YY')
                  : [
                      moment(data.s_date, 'YYYY-MM-DD').format('DD MMM YY'),
                      moment(data.e_date, 'YYYY-MM-DD').format('DD MMM YY'),
                    ]
              }
            />
            <DetailValue
              label="lama ijin/Cuti"
              value={data.tot_day + ' Hari'}
            />
            <DetailValue
              label="Penanggung jawab penngganti"
              value={data.caretaker_name}
            />
            <DetailValue label="catatan" value={data.note} />
            <DetailValue label="atasan" value={data.approver_name ?? '-'} />
            <DetailValue
              label="catatan atasan"
              value={data.approver_note ?? '-'}
            />
            <DetailImage source={data.images_url} />
          </VStack>
          {data.status < 1 && reviewer ? (
            <VStack py={5} space={3} pb={5}>
              <HStack space={3}>
                <TouchableOpacity
                  onPress={() => {
                    setNote('');
                    setConfirmAlert({
                      ...confirmAlert,
                      show: true,
                      title: 'Tolak pengajuan',
                      message: 'anda yakin akan menolak pengajuan.?',
                      data: {status: '3', id: data.id},
                    });
                  }}
                  className="bg-primary-200 p-4 items-center rounded-md flex-1">
                  <Text
                    className="text-primary-950 text-base uppercase"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    tolak
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setNote('');
                    setConfirmAlert({
                      ...confirmAlert,
                      show: true,
                      title: 'Setujui pengajuan',
                      message: 'anda yakin akan menyetujui pengajuan.?',
                      data: {status: '1', id: data.id},
                    });
                  }}
                  className="bg-primary-500 p-4 items-center rounded-md flex-1">
                  <Text
                    className="text-base text-white uppercase"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    Setujui
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          ) : (
            data.status < 2 &&
            !reviewer && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    cancelAction({status: '5', id: data.id}).then(({data}) => {
                      if (data.success) {
                        setAlert({
                          show: true,
                          type: 'success',
                          title: 'Pengajuan Dibatalkan',
                          message: 'Pengajuan anda telah di batalkan',
                          quote: false,
                          onOK: () => {
                            setAlert({show: false});
                            goBack();
                          },
                        });
                      } else {
                        setAlert({
                          show: true,
                          type: 'error',
                          title: 'Error',
                          message: 'Terjadi Kesalahan',
                          quote: false,
                          onOK: () => {
                            setAlert({show: false});
                          },
                        });
                      }
                    });
                  }}
                  className="bg-primary-200 p-4 items-center rounded-md">
                  <Text
                    className="text-primary-950 text-base"
                    style={{fontFamily: 'Inter-SemiBold'}}>
                    Batalkan Pengajuan
                  </Text>
                </TouchableOpacity>
              </>
            )
          )}
        </ScrollView>
      </VStack>
    </>
  );
};

export default LeaveDetails;
